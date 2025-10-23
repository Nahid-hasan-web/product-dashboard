const express = require('express')
const { addToCart, select_qty } = require('../../controllers/cartController')
const cartApi = express.Router()

cartApi.post('/addCart' , addToCart)
cartApi.post('/selectQty' , select_qty)


module.exports = cartApi






