const express = require('express');
const CourseController = require('../controllers/course.controller');
const authenticate = require('../../middlewares/authentication');
const authorize = require('../../middlewares/authorization');
const multer = require('multer');

const router = express.Router();
const path = require('path');
const { uploadWithProgress } = require('../controllers/upload.controller');

// Cấu hình lưu file tạm
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const upload = multer({ storage });
router.post('/upload-img', upload.single('image'), CourseController.UploadImage)
router.post('/upload-file', upload.single('file'), uploadWithProgress);

router.post('/create-course', authenticate, authorize(['user']), CourseController.CreateCourse)
router.post('/create-section', authenticate, authorize(['user']), CourseController.CreateSection)

router.get('/get-all-course', authenticate, authorize(['admin']), CourseController.getAllCourse)
router.get('/get-course/:course_id', CourseController.getCourseById)
//router.get('/get-sections-in-course/:course_id')

module.exports = router;