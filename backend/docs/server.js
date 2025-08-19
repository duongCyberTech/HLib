const express = require('express');
const docsRoutes = require('./routes/docs.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config/.env' });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/docs', docsRoutes);

require('./wsServer')

const PORT = process.env.DOCS_PORT || 3003;
// http://localhost:3003/api/docs
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
