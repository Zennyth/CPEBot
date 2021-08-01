const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  aesToken:process.env.AES_TOKEN,
  saltRounds: process.env.SALT_ROUNDS,
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    prefix: process.env.DISCORD_BOT_PREFIX
  },
  pushover: {
    user: process.env.PUSHOVER_USER,
    token: process.env.PUSHOVER_TOKEN
  },
  refresh: process.env.REFRESH
}