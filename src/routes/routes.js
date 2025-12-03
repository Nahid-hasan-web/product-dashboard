const express = require('express')
const authRoute = require('./api/autapi')
const productApi = require('./api/productApi')
const cartApi = require('./api/cartApi')
const orderApi = require('./api/order')
const cuponApi = require('./api/cuponApi')
const financeApi = require('./api/finance')
const categoryApi = require('./api/category')
const dashbaordApi = require('./api/dashboardApi')
const route = express.Router()


// ----------------------------- all api routes
route.use('/auth' , authRoute)

route.use('/category' , categoryApi)

route.use('/product' , productApi)

route.use('/cart' , cartApi)

route.use('/order' ,orderApi)

route.use('/cupon' ,cuponApi)

route.use('/dashboard' ,dashbaordApi)

route.use('/finance' ,financeApi)



module.exports = route