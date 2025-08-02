const {client, pool, sql} = require('../config/dbConfig')
const { v4: uuidv4 } = require('uuid');

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

    async getAllCourse(filter, offset){
        try{
            const result = await pool.query(`
                SELECT  course_id, title, description, price, is_active
                FROM courses
                WHERE title LIKE ? OR description LIKE ?
                LIMIT ? OFFSET 0;
            `,[`%${filter}%`, `%${filter}%`, offset]) 
            return {data: result, message: "Get all course!"}
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
}

module.exports = new CourseService()