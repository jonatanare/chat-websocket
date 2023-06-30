const socket = require('../../socket').socket
const store = require('./store')

function addMessage(chat, user, message, file) {

    return new Promise((resolve, reject) => {
        if(!chat || !user || !message) {
            console.error('[messageController] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: file
        }

        store.add(fullMessage)

        socket.io.emit('message', fullMessage)
    
        resolve(fullMessage)
    })
    
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if(!id || !message) {
            reject('Invalid data')
            return false
        }
        const result = await store.updateMessage(id, message)
        resolve(result)
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if(!id) {
            reject('Invalid data!')
            return false
        }
    
        store.deleteMessage(id)
            .then(() => {
                resolve()
            })
            .catch(e => {
                reject(e)
            })
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}