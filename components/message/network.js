const express = require('express')
const response = require('../../network/response')
const controller = require('./constroller')
const router = express.Router()

router.get('/', function(req, resp) {
    const {user, message } = req.body
    resp.header({
        'Custom-Header': 'Valor personalizado'
    })
    controller.getMessages(user, message)
    .then((messages) => {
        response.success(req, resp, messages, 200)
    })
    .catch((e) => {
        response.error(req, resp, 'No hemos podido traer los datos', 500, e)
    })
})

router.post('/', function(req, resp) {
    controller.addMessage(req.body.user, req.body.message)

    .then((fullMessage) => {
        response.success(req, resp, fullMessage, 200)
    })
    .catch((e) => {
        response.error(req, resp,  'Información inválida', 400, e)
    })
})

router.delete('/', function(req, resp) {
    resp.send('Eliminado correctamente!')
})

module.exports = router