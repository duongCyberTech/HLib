const express = require('express');
const courseRoutes = require('./routes/course.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config/.env' });

app.use(cors());
app.use(bodyParser.json());

app.use('/', courseRoutes); // The gateway handles the /api/course prefix

require('./wsServer');

const PORT = process.env.COURSE_PORT || 3002;
// http://localhost:3002/api/course
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
