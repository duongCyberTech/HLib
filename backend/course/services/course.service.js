const {client, pool, sql} = require('../config/dbConfig')
const { v4: uuidv4 } = require('uuid');
const v2 = require('./cloudinary')
const fs = require('fs');
const path = require('path');

class CourseService{
    async CreateCourse(data) {
        const connection = await pool.getConnection()
        try{
            await connection.beginTransaction()
            const id = uuidv4()
            await connection.query(`
                insert into courses(course_id, title, description, is_active, uid)
                values (?, ?, ?, ?, ?)
            `,[id, data.title, data.description || "", true, data.uid])
            await connection.commit()
            return {course_id: id, data: data, message: "Create course successfully!"}
        } catch(error){
            console.log(error)
            await connection.rollback()
            return {message: "Error while creating course"}
        } finally {
            connection.release()
        }
    }

    async CreateSection(data){
        const connection = await pool.getConnection()
        try{
            await connection.beginTransaction()
            const id = uuidv4()
            await connection.query(`
                insert into section(course_id, section_id, title, description)
                values (?, ?, ?, ?)
            `,[data.course_id, id, data.title, data.description || ""])
            await connection.commit()
            return {section_id: id, data: data, message: "Create section successfully!"}
        } catch(error){
            console.log(error)
            await connection.rollback()
            return {message: `Error while adding section into course ${course_id}`}
        } finally {
            connection.release()
        }     
    }

    async getAllCourse(filter, offset, limit, sortPrice, startDate, endDate){
        try{
            let query = `
            SELECT c.course_id, c.title, c.description, c.price, c.is_active, c.sale_number, c.languages,
            CONCAT(c.duration_num,' ', c.duration_unit) as duration, c.updated_date as last_update,
            CONCAT(u.fname, ' ', u.mname, ' ', u.lname) as fullname, u.avata,
            cat.name as category_name, b.breadcrumb_name
            FROM courses as c JOIN users as u ON c.uid = u.uid
            JOIN categories as cat ON c.category_id = cat.category_id
            JOIN course_breadcrumbs as cb ON c.course_id = cb.course_id
            JOIN breadcrumbs as b ON cb.breadcrumb_id = b.breadcrumb_id
            `;

            const params = [];

            if (filter || startDate || endDate) query += " WHERE "

            // add filter condition
            if (filter) {
                query += " title LIKE ? OR description LIKE ?";
                params.push(`%${filter}%`, `%${filter}%`);
            }

            if (startDate){
                query += (filter ? " AND update_date >= ?": " update_date >= ?")
                params.push(startDate)
            }

            if (endDate){
                query += (filter || startDate ? " AND update_date <= ?" : " update_date <= ?")
            }
            // add limit & offset
            if (limit && offset !== undefined) {
                query += " LIMIT ? OFFSET ?";
                params.push(Number(limit), Number(offset));
            }

            if (sortPrice){
                query += " ORDER BY price ?"
                params.push(sortPrice)
            }

            const [result] = await pool.query(query, params);
            const rcourses = Object.values(
                result.reduce((acc, course) => {
                    if (!acc[course.course_id]) {
                        acc[course.course_id] = { ...course, breadcrumbs: [] };
                    }
                    acc[course.course_id].breadcrumbs.push(course.breadcrumb_name);
                    return acc;
                }, {})
            )
            console.log(">>> data: ", rcourses)
            return {data: rcourses, message: "Get all course!"}
        }catch(error){
            console.log(error)
            return {message: "Get course failed!"}
        }   
    }

    async getCourseById(course_id){
        try {
            const result = await pool.query(`
                SELECT * FROM courses
                WHERE course_id = ?
            `,[course_id])
            return {data: result, message: `Get course: ${result.title}`}
        } catch (error) {
            console.log(error)
            return {message: "Get course failed!"}
        }
    }

    async getAllSectionByCourse(course_id){
        try {
            const result = await pool.query(`
                SELECT * FROM section
                WHERE course_id = ?
            `,[course_id])
            return {data: result, message: `Sections in course: ${course_id}`}
        } catch (error) {
            console.log(error)
            return {message: "Get course failed!"}
        }        
    }

    async getSectionDetail(course_id, section_id){
        try {
            const section = await pool.query(`
                SELECT * FROM courses
                WHERE course_id = ? AND section_id = ?
            `,[course_id, section_id])
            const img = await pool.query(`
                SELECT file_path from image 
                WHERE course_id = ? AND section_id = ?
            `,[course_id, section_id])
            return {data: result, message: `Get section: ${course_id} - ${section_id}`}
        } catch (error) {
            console.log(error)
            return {message: "Get course failed!"}
        }        
    }

    async uploadImage(imgData, imgFile) {
        try {
            const iid = uuidv4();
            const result = await v2.uploader.upload(imgFile.path, {
                resource_type: "auto",
                public_id: `courses/${imgData.course_id}/sections/${imgData.section_id}/${imgFile.originalname}`
            });

            const formattedRes = {
                course_id: imgData.course_id,
                section_id: imgData.section_id,
                image_id: iid,
                image_name:  imgFile.originalname,
                file_path: result.secure_url,
                fileSizeInKB: (result.bytes).toFixed(2),
                fileType: result.format,
                description: imgData.description
            }

            await pool.query(`
                INSERT INTO image(
                    image_id, course_id, section_id,
                    title, description, file_path,
                    file_size, file_type
                )
                VALUES(?,?,?,?,?,?,?,?);
            `, [
                formattedRes.image_id, formattedRes.course_id, formattedRes.section_id,
                formattedRes.image_name, formattedRes.description || '', formattedRes.file_path,
                formattedRes.fileSizeInKB || 0, formattedRes.fileType
            ])
            return {data: formattedRes, message: "Upload image successfully!"}
        } catch (error) {
            console.log(error)
            throw new Error("Upload Failed!")
        }
    }

    async uploadVideo(videoDes, videoFile){
        try{
            const vid = uuidv4()
            const result = await v2.uploader.upload(videoFile.path, {
                resource_type: 'video',
                folder:`courses/${videoDes.course_id}/sections/${videoDes.section_id}`,
                public_id: `courses/${videoDes.course_id}/sections/${videoDes.section_id}/${videoFile.originalname}`,
                chunk_size: 6000000
            })
            const video_time = result.duration;
            const video_length = `${video_time/3600}:${(video_time/60)%60}:${video_time%60}`
            const formattedRes = {
                title: videoFile.originalname,
                file_path: result.secure_url
            }

            await pool.query(`
                INSERT INTO videos
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,[
                vid, videoDes.section_id, videoDes.course_id, formattedRes.title,
                videoDes.description || '', formattedRes.path, videoFile.mimetype,
                video_length || '00:00'
            ])

            return {
                data: {
                    video_id: vid,
                    title: formattedRes.title,
                    file_path: formattedRes.secure_url
                },
                message: "Upload Successfully!"
            }
        } catch(err){
            throw new Error("Upload Failure!")
        }
    }
}

module.exports = new CourseService()