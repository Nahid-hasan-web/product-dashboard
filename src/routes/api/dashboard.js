const express = require('express')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const { report_controller } = require('../../controllers/dashboard')
const dashbaordApi  = express.Router()

dashbaordApi.get('/dashbaord-report' , jwtVerifecation ,  report_controller)


module.exports = dashbaordApi