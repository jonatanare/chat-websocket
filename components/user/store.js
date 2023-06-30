const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user)
    return myUser.save()
}

function getAllUsers() {
    const users = Model.find()
    return users;
}

module.exports = {
    add: addUser,
    list: getAllUsers
}