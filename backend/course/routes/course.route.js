const express = require('express');
const CourseController = require('../controllers/course.controller');
const authenticate = require('../../middlewares/authentication');
const authorize = require('../../middlewares/authorization');

const router = express.Router();

// console.log(typeof authenticate); // phải là 'function'
// console.log(typeof authorize);    // phải là 'function'
// console.log(typeof authorize(['user'])); // cũng phải là 'function'
// console.log(typeof CourseController.CreateCourse); // phải là 'function'

router.post('/create-course', authenticate, authorize(['user']), CourseController.CreateCourse)
router.post('/create-section', authenticate, authorize(['user']), CourseController.CreateSection)

module.exports = router;