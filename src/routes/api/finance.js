const express = require('express')
const { salesReport, revenueReport, add_revenue_target } = require('../../controllers/finance_contoller')
const checkRole = require('../../middlewares/userVerifecation')
const jwtVerification = require('../../middlewares/JWTverifecation')
const financeApi = express.Router()

// ------------ finance APIs
financeApi.get('/sales-report' , jwtVerification , checkRole(['admin' , 'staff']), salesReport)

financeApi.get('/revenue-report' , revenueReport)

financeApi.post('/add-revenue-target' ,add_revenue_target)

module.exports = financeApi
