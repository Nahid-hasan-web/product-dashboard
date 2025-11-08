const express = require('express')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const { report_controller } = require('../../controllers/dashboard')
const dashbaordRoute  = express.Router()

dashbaordRoute.get('/dashbaord-report' , jwtVerifecation ,  report_controller)


module.exports = dashbaordRoute