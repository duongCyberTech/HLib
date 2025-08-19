const multer = require('multer');
const express = require('express');
const authenticate = require('../../middlewares/authentication');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authenticate(), upload.single('file'))
