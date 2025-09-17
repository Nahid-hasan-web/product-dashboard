const express = require('express')
const { addCatagory } = require('../../controllers/productController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const productApi = express.Router()
const multer  = require('multer')

const checkRole = require('../../middlewares/userVerifecation')
const upload = multer({ dest: 'uploads/' })

productApi.post('/addCatagory',jwtVerifecation , checkRole(['admin','staff']), upload.single('productImage') ,addCatagory)





module.exports = productApi