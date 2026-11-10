const mongoose = require('mongoose')

console.log('Connection String:',!!process.env.CONNECTION_STRING)
mongoose.connect(process.env.CONNECTION_STRING).then(res=>{
    console.log("Server Connected to MongoDB")
}).catch(err=>{
    console.log(err)
})