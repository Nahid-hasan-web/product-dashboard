const express = require('express')
const { addToCart, select_qty, delete_cart } = require('../../controllers/cartController')
const cartApi = express.Router()

cartApi.post('/addCart' , addToCart)
cartApi.post('/selectQty' , select_qty)
cartApi.delete('/deleteCart' , delete_cart)


module.exports = cartApi






