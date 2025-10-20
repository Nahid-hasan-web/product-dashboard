const express = require('express')
const { registerController, verifyOtp, resendOtp, loginController, updateProfileController, get_currect_user, deleteUser } = require('../../controllers/authController')
const jwtVerifecation = require('../../middlewares/JWTverifecation')
const checkRole = require('../../middlewares/userVerifecation')
const authRoute = express.Router()




authRoute.post('/register' , registerController)
authRoute.post('/verifyOtp' , verifyOtp)
authRoute.post('/resendOtp' , resendOtp)
authRoute.post('/login' , loginController)
authRoute.post('/updateProfile' , jwtVerifecation,  updateProfileController)
authRoute.get('/getCurrentUser',jwtVerifecation , get_currect_user)
authRoute.delete('/deleteUser',jwtVerifecation , checkRole(['admin']),  deleteUser)




module.exports = authRoute