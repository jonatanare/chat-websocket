const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user)
    return myUser.save()
}

async function getAllUsers() {
    const users = await Model.find({})
    return users;
}

module.exports = {
    add: addUser,
    getAllUsers
}