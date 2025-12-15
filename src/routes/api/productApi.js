const express = require('express')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const productApi = express.Router()
const multer  = require('multer')
const checkRole = require('../../middlewares/userVerifecation')
const { addProduct, update_Product, update_status, give_review, get_dashboard_product, get_singel_product, deleteProduct, getProducts_public, filterPoductsByStatus } = require('../../controllers/product_controller')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 8 }])

productApi.post('/addProduct'  , jwtVerifecation , checkRole(['admin' , 'staff']) ,uploadMiddleware, addProduct)

productApi.post('/updateProduct' , jwtVerifecation , checkRole(['admin' , 'staff']),uploadMiddleware , update_Product)

productApi.post('/updateStatus' , jwtVerifecation , checkRole(['admin'])  , update_status)

productApi.post('/giveReview' ,  give_review)

productApi.get('/productDetails/:slug' , get_singel_product)

productApi.get('/getProduct', jwtVerifecation , checkRole(['admin' , 'staff']) ,  get_dashboard_product)

productApi.get('/getProduct_public' ,getProducts_public)

productApi.delete('/deleteProduct', jwtVerifecation , checkRole(['admin' ]) ,  deleteProduct)


productApi.post('/filterByStatus', jwtVerifecation , checkRole(['admin' , 'staff']) ,filterPoductsByStatus)



module.exports = productApi