const express = require('express')
const { addCatagory } = require('../../controllers/catagoryController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const productApi = express.Router()
const multer  = require('multer')
const checkRole = require('../../middlewares/userVerifecation')
const { addProduct, update_Product, update_status, give_review, get_dashboard_product, get_singel_product, deleteProduct, getProducts_public } = require('../../controllers/product_controller')
const upload = multer({ dest: 'uploads/' })
const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 8 }])

productApi.post('/addCatagory',jwtVerifecation , checkRole(['admin' , 'staff']), upload.single('productImage') ,addCatagory)

productApi.post('/addProduct' ,uploadMiddleware, addProduct)

productApi.post('/updateProduct',uploadMiddleware , update_Product)

productApi.post('/updateStatus' , jwtVerifecation , checkRole(['admin'])  , update_status)

productApi.post('/giveReview' ,  give_review)

productApi.get('/productDetails/:slug' , get_singel_product)

productApi.get('/getProduct' ,  get_dashboard_product)

productApi.get('/getProduct_public' ,getProducts_public)

productApi.delete('/deleteProduct' ,  deleteProduct)



module.exports = productApi