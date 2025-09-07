const express = require('express')
const { registerController, verifyOtp, resendOtp, loginController, updateProfileController } = require('../../controllers/authController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const authRoute = express.Router()

authRoute.post('/register' , registerController)
authRoute.post('/verifyOtp' , verifyOtp)
authRoute.post('/resendOtp' , resendOtp)
authRoute.post('/login' , loginController)
authRoute.post('/updateProfile' , jwtVerifecation,  updateProfileController)


module.exports = authRoute