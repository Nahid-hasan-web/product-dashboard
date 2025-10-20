const express = require('express')
const { registerController, verifyOtp, resendOtp, loginController, updateProfileController, get_currect_user } = require('../../controllers/authController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const authRoute = express.Router()




authRoute.post('/register' , registerController)
authRoute.post('/verifyOtp' , verifyOtp)
authRoute.post('/resendOtp' , resendOtp)
authRoute.post('/login' , loginController)
authRoute.post('/updateProfile' , jwtVerifecation,  updateProfileController)
authRoute.get('/getCurrentUser',jwtVerifecation , get_currect_user)




module.exports = authRoute