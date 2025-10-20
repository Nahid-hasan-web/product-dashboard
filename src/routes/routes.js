const express = require('express')
const authRoute = require('./api/autapi')
const productApi = require('./api/productApi')
const cartApi = require('./api/cartApi')
const route = express.Router()

route.use('/auth' , authRoute)
route.use('/product' , productApi)
route.use('/cart' , cartApi)

module.exports = route