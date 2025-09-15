const express = require('express')
const authRoute = require('./api/autapi')
const productApi = require('./api/productApi')
const route = express.Router()

route.use('/auth' , authRoute)
route.use('/product' , productApi)

module.exports = route