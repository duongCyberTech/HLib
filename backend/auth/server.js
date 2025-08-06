const express = require('express');
const authRoutes = require('./routes/auth.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.AUTH_PORT;
// http://localhost:3001/api/auth/register
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
