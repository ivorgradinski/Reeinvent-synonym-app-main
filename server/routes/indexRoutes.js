const express = require('express');
const synonymRoutes = require('./synonymRoutes');

const router = express.Router();

router.use('/synonyms', synonymRoutes);

module.exports = router;
