const express = require('express')
const { salesReport, revenueReport } = require('../../controllers/finance_contoller')
const financeApi = express.Router()

// ------------ finance APIs
financeApi.get('/sales-report' , salesReport)
financeApi.get('/revenue-report' , revenueReport)

module.exports = financeApi
