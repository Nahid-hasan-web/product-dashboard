const express = require('express')
const { report_controller } = require('../../controllers/dashboard')
const jwtVerification = require('../../middlewares/JWTverifecation')
const checkRole = require('../../middlewares/userVerifecation')
const dashbaordApi  = express.Router()

dashbaordApi.get('/dashbaord-report' , jwtVerification , checkRole(['admin' , 'staff']),  report_controller)


module.exports = dashbaordApi