const express = require('express');
const authRoutes = require('./routes/auth.route');
const cors = require('cors');
const https = require("https")
const fs = require('fs')
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json()); // Use built-in JSON parser

app.use('/', authRoutes); // The gateway handles the /api/auth prefix

// SSL options - uncomment when SSL certificates are available
// const options = {
//     key: fs.readFileSync("../server.key"),
//     cert: fs.readFileSync('../server.cert'),
// }

const PORT = process.env.AUTH_PORT;
// http://localhost:3001/api/auth/register

// https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server is running at https://localhost:${PORT}`)
// })
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
