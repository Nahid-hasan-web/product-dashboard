const express = require('express')
const { add_cupon, update_cupon, get_cupon } = require('../../controllers/cuponController')

const cuponApi = express.Router()

cuponApi.post('/add-cupon' , add_cupon)
cuponApi.post('/update-cupon' , update_cupon)
cuponApi.get('/get-cupon' , get_cupon)

module.exports = cuponApi