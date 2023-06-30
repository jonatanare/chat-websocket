const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)

app.use(express.static('public'))

require('dotenv').config()
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')
db(URL)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

socket.connect(server)

router(app)

server.listen(8080, function() {
  console.log('La aplicación está escuchando en http://localhost:8080');
})