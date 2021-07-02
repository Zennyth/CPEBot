const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }
}