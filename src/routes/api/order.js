const express = require('express')
const { placeOrder, get_All_orders } = require('../../controllers/orderController')

const orderApi = express.Router()

orderApi.post('/place-order' , placeOrder)

orderApi.get('/get-orders' , get_All_orders)

module.exports = orderApi
