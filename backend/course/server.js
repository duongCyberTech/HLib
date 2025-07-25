const express = require('express');
const courseRoutes = require('./routes/course.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config/.env' });
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Cấu hình swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3002" }],
  },
  apis: ["./routes/*.js"], // 👈 đúng đường dẫn file chứa @swagger
});
console.log(JSON.stringify(swaggerSpec, null, 2));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello Swagger!" });
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/course', courseRoutes);

const PORT = process.env.SERVICE_PORT || 3002;
// http://localhost:3001/api/auth/register
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
