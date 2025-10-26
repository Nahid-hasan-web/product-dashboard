const express = require('express')
const { addToCart, select_qty, delete_cart, get_cart } = require('../../controllers/cartController')
const cartApi = express.Router()

cartApi.post('/addCart' , addToCart)
cartApi.post('/selectQty' , select_qty)
cartApi.delete('/deleteCart' , delete_cart)
cartApi.get('/getCart' , get_cart)


module.exports = cartApi






