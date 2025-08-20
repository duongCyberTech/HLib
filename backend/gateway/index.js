const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerCombine = require('swagger-combine');
const path = require('path');

const app = express();
require('dotenv').config()

// Gộp Swagger spec từ nhiều file
const swaggerFile = path.join(__dirname, 'swagger', 'combined.yaml');
swaggerCombine(swaggerFile, { continueOnError: true })
  .then((combinedSpec) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSpec));
    console.log('✅ Swagger docs available at /api-docs');
  })
  .catch((err) => {
    console.error('❌ Failed to combine Swagger specs:', err.message);
  });

// Forward API calls đến các microservice (auth, user, v.v.)
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/user', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

const PORT = process.env.GATEWAY_PORT;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});
