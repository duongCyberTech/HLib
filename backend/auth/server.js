const express = require('express');
const authRoutes = require('./routes/auth.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
// Cấu hình swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./routes/*.js"], // 👈 đúng đường dẫn file chứa @swagger
});
console.log(JSON.stringify(swaggerSpec, null, 2));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello Swagger!" });
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.AUTH_PORT;
// http://localhost:3001/api/auth/register
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
