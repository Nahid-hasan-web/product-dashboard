const express = require('express')
const authRoute = require('./api/autapi')
const route = express.Router()

route.use('/auth' , authRoute)


module.exports = route