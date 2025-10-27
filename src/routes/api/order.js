const express = require('express')
const { placeOrder } = require('../../controllers/orderController')

const orderApi = express.Router()

orderApi.post('/place-order' , placeOrder)

module.exports = orderApi
