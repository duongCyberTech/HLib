const CourseService = require('../services/course.service')

class CourseController{
    async CreateCourse(req, res){
        try{
            const result = await CourseService.CreateCourse(req.body)
            if (!result?.data) return res.status(400).json(result)
            return res.status(201).json(result)
        }catch(error){
            return res.status(500).json({message: "Network Error!"})
        }
    }

    async CreateSection(req, res){
        try {
            const result = await CourseService.CreateSection(req.body)
            if (!result?.data) return res.status(400).json(result)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({message: "Network Error!"})
        }
    }

    async getAllCourse(req, res){
        console.log(req.body)
        try {
            const result = await CourseService.getAllCourse(req.query?.filter, req.query?.offset, req.query?.limit)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({message: "Internal Error"})
        }
    }

    async getCourseById(req,res){
        try {
            const result = await CourseService.getCourseById(req.params.course_id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({message: "Internal Error"})
        }
    }

    async UploadImage(req, res){
        try {
            const result = await CourseService.uploadImage(req.body, req.file)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({message: "Error Network"})
        }
    }
}

module.exports = new CourseController()