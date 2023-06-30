const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const db = require('./db')
const router = require('./network/routes')
db(URL)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router(app)



app.listen(8080)
console.log('La aplicación está escuchando en el puerto 8080');