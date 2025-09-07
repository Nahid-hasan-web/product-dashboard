const mongoose = require('mongoose')
const dbconnection = () => {
    mongoose.connect(process.env.dbLink)
    .then(() => { console.log('Db connected') })
    .catch((err)=>console.log(err))
}

module.exports = dbconnection