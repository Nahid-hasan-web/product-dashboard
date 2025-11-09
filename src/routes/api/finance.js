const express = require('express')
const { salesReport } = require('../../controllers/finance_contoller')
const financeApi = express.Router()

// ------------ finance APIs
financeApi.get('/sales-report' , salesReport)

module.exports = financeApi
