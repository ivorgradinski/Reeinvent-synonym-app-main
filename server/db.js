const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1);
  });

module.exports = pool;
