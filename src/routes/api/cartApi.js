const express = require('express')
const { addToCart } = require('../../controllers/cartController')
const cartApi = express.Router()

cartApi.post('/addCart' , addToCart)


module.exports = cartApi






