const db = require('mongoose')



db.Promise = global.Promise
async function connect(url) {
    await db.connect(url)
    console.log('[db] DB conectada con éxito!!!');
}

module.exports = connect