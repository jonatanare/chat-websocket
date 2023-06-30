const Model = require("./model");

function addChat(chat) {
  const mychat = new Model(chat)
  return mychat.save()
}

function listChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (userId) {
      filter = {
        users: userId
      }
    }
    const chats = Model.find(filter)
        .populate('users')
        .catch(e => {
          reject(e)
      })
    resolve(chats)
  })
}

module.exports = {
  add: addChat,
  list: listChats
};
