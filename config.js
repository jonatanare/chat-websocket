require('dotenv').config()
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  PORT,
  HOST
} = process.env

const config = {
    dbUrl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    port: PORT || 8080,
    host: HOST || 'http://localhost'
}

module.exports = config