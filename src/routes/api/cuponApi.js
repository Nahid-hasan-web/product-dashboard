const express = require('express')
const { add_cupon } = require('../../controllers/cuponController')

const cuponApi = express.Router()

cuponApi.post('/add-cupon' , add_cupon)

module.exports = cuponApi