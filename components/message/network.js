const express = require('express')
const path = require('path')
const multer = require('multer')
const response = require('../../network/response')
const controller = require('./controller')
const { log } = require('console')
const router = express.Router()

const storage = multer.diskStorage({
    destination: 'public/files/',
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname.replace(/ /g, '-'))
    }
})

const upload = multer({
    storage: storage
})

router.get('/', function(req, resp) {
    const filterMessages = req.query.chat || null
    controller.getMessages(filterMessages)
    .then((messages) => {
        response.success(req, resp, messages, 200)
    })
    .catch((e) => {
        response.error(req, resp, 'No hemos podido traer los datos', 500, e)
    })
})

router.post('/', upload.single('file'), function(req, resp) {
    let fileUrl = '';
    if (req.file) {
        fileUrl = `${req.protocol}://${req.get('host')}/${req.file.destination}${req.file.filename}`;
    }
    controller.addMessage(req.body.chat, req.body.user, req.body.message, fileUrl)

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