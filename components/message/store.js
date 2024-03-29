const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterUser !== null) {
      filter = { user: filterUser };
    }
    // se utiliza await porque estamos haciendo una petición a nuestra base de datos
    const messages = Model.find(filter)
        .populate('user')
        .catch(e => {
            reject(e)
        })
    resolve(messages);
  });
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findOne({ _id: id });

  foundMessage.message = message;

  const newMessage = foundMessage.save();

  return newMessage;
}

async function deleteMessage(id) {
  const deletedMessage = await Model.deleteOne({ _id: id });
  return deletedMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get
  updateMessage,
  deleteMessage,
};
