const express = require('express')
const bodyParser = require('body-parser')
// const router = require('./components/message/network')
const router = require('./network/routes')

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router(app)



app.listen(8080)
console.log('La aplicación está escuchando en el puerto 8080');