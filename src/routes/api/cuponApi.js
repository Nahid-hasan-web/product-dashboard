const express = require('express')
const { add_cupon, update_cupon, get_cupon, delete_cupon } = require('../../controllers/cuponController')
const checkRole = require('../../middlewares/userVerifecation')
const jwtVerification = require('../../middlewares/JWTverifecation')

const cuponApi = express.Router()

cuponApi.post('/add-cupon', jwtVerification, checkRole(['admin']) , add_cupon)
cuponApi.post('/update-cupon', jwtVerification , checkRole(['admin']) , update_cupon)
cuponApi.delete('/delete-cupon'  ,jwtVerification , checkRole(['admin'])  , delete_cupon)
cuponApi.get('/get-cupon', jwtVerification , checkRole(['admin' , 'staff'])  , get_cupon)

module.exports = cuponApi