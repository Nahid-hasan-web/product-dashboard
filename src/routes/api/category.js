const express = require('express')
const { addCatagory, get_category, delete_category } = require('../../controllers/catagoryController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const categoryApi = express.Router()
const multer  = require('multer')
const checkRole = require('../../middlewares/userVerifecation')
const upload = multer({ dest: 'uploads/' })


categoryApi.post('/addCatagory' ,jwtVerifecation, checkRole(['admin' , 'staff']) ,upload.single('productImage') ,addCatagory)

categoryApi.get('/getAllCagegory',  get_category)

categoryApi.delete('/deleteCategory', jwtVerifecation , checkRole(['admin'])  ,  delete_category)



module.exports = categoryApi 