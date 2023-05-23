const express = require('express')
const response = require('../../network/response')
const controller = require('./constroller')
const router = express.Router()

router.get('/', function(req, resp) {
    const filterMessages = req.query.user || null
    controller.getMessages(filterMessages)
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

router.patch('/:id', function(req, res) {
    const { id } = req.params
    const { message } = req.body

    controller.updateMessage(id, message)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

router.delete('/:id', function(req, res) {
    const { id } = req.params
    controller.deleteMessage(id)
        .then(() => {
            response.success(req, res, `Mensaje ${id} eliminado`, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e)
        })
})

module.exports = router