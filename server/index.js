require('dotenv').config()

const express =require('express')
const cors = require ('cors')
const productRoute = require('./routes/route')
const staffRoute = require('./routes/staffRoute')
const supplierRoute = require('./routes/supplierRoute')
const billRoute = require('./routes/billRoute')
const returnRoute = require('./routes/returnRoute')
const reportRoute = require('./routes/reportRoute')
const adminRoute = require('./routes/adminRoute')
const app = express()
require('./dbconnect/db')

app.use(cors())
app.use(express.json())

app.use('/uploads',express.static('./uploads'))
app.use(productRoute)
app.use(staffRoute)
app.use(supplierRoute)
app.get('/test', (req, res) => {
    res.status(200).json("Server Working")
})
app.use(billRoute)
app.use(returnRoute)
app.use(reportRoute)
app.use(adminRoute)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server running at:${PORT}`)
})