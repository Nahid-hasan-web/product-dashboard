const express = require('express')
const authRoute = require('./api/autapi')
const productApi = require('./api/productApi')
const cartApi = require('./api/cartApi')
const orderApi = require('./api/order')
const route = express.Router()

route.use('/auth' , authRoute)
route.use('/product' , productApi)
route.use('/cart' , cartApi)
route.use('/order' ,orderApi)

module.exports = route