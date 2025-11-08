// --------------- all requires
const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const  route = require('./src/routes/routes')
const dbconnection = require('./db')
require('dotenv').config()
// ---------------- middlewares
app.use(cors({
  origin: '*', // allow only your frontend origin
  credentials: true,               // <--- allow cookies to be sent
}));
app.use(express.json())
app.use(route)
dbconnection()

// ----------------- run port
app.listen(port, () => {
    console.log(`this app is runnign at port ${port}`)
}) 




