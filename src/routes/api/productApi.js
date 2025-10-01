const express = require('express')
const { addCatagory } = require('../../controllers/catagoryController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const productApi = express.Router()
const multer  = require('multer')
const checkRole = require('../../middlewares/userVerifecation')
const { addProduct, update_Product } = require('../../controllers/product_controller')
const upload = multer({ dest: 'uploads/' })
const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 8 }])

productApi.post('/addCatagory',jwtVerifecation , checkRole(['admin' , 'staff']), upload.single('productImage') ,addCatagory)
productApi.post('/addProduct' ,uploadMiddleware, addProduct)
productApi.post('/updateProduct' , update_Product)




module.exports = productApi