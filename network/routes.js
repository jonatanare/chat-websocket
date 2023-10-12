const express = require('express')
const message = require('../components/message/network')
const user = require('../components/user/network')
const chat = require('../components/chat/network')

const routes = function (server) {
    server.use('/message', message)
    server.use('/users', user)
    server.use('/chats', chat)
}

module.exports =  routes