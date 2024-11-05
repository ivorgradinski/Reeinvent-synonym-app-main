const express = require('express');
require('dotenv').config();
const cors = require('cors');
const apiLimiter = require('./utils/rateLimiter');
const indexRoutes = require('./routes/indexRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(apiLimiter);


app.use('/api', indexRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
