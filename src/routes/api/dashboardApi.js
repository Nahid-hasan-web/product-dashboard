const express = require('express')
const jwtVerification = require('../../middlewares/JWTverifecation')
const checkRole = require('../../middlewares/userVerifecation')
const { report_no_controller } = require('../../controllers/dashboard')
const dashbaordApi  = express.Router()

dashbaordApi.get('/dashborad-report-no' , report_no_controller)


module.exports = dashbaordApi