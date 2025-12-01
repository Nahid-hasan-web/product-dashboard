const express = require('express')
const { placeOrder, get_All_orders } = require('../../controllers/orderController')
const jwtVerification = require('../../middlewares/JWTverifecation')
const checkRole = require('../../middlewares/userVerifecation')

const orderApi = express.Router()

orderApi.post('/place-order' , placeOrder)

orderApi.get('/get-orders' , jwtVerification , checkRole(['admin' , 'user']) , get_All_orders)

module.exports = orderApi
