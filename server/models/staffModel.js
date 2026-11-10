const mongoose=require('mongoose')
const staffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})
const staff = mongoose.model('staff',staffSchema)

module.exports = staff