const express = require('express')
const { placeOrder, get_All_orders, getCustomerList } = require('../../controllers/orderController')
const jwtVerification = require('../../middlewares/JWTverifecation')
const checkRole = require('../../middlewares/userVerifecation')

const orderApi = express.Router()

orderApi.post('/place-order' , placeOrder)

orderApi.get('/get-orders' , jwtVerification , checkRole(['admin' , 'user']) , get_All_orders)

orderApi.get('/get-cutomer-list' , jwtVerification , checkRole(['admin' , 'user']) , getCustomerList)

module.exports = orderApi
