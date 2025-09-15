const express = require('express')
const { addCatagory } = require('../../controllers/productController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const productApi = express.Router()


productApi.post('/addCatagory',jwtVerifecation ,addCatagory)





module.exports = productApi