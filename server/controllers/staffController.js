const staff = require('../models/staffModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.addStaff = async(req,res)=>{
    const {name,email,password,phone}=req.body
    const existingStaff = await staff.findOne({email})

    if(existingStaff){
        res.status(406).json("Already Added!!")
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10)
        const newStaff = await staff.create({
            name,email,password:hashedPassword,phone
        })
        res.status(200).json(newStaff)
    }
}

exports.listStaff = async(req,res)=>{
    const stafflist = await staff.find().select('-password')
    res.status(200).json(stafflist)
}

exports.updateStaff =async(req,res)=>{
    const {sid}=req.params
    const {name,email,phone}=req.body

    const updateStaff = await staff.findByIdAndUpdate(
        sid,
        {name,email,phone},
        {new:true}
    )
    res.status(200).json(updateStaff)
}

exports.deleteStaff=async(req,res)=>{
    const{sid}=req.params
    const deleteStaff = await staff.findByIdAndDelete(sid)
    res.status(200).json("Deleted Successfully")
}

exports.loginStaff = async(req,res)=>{
    const {email,password}=req.body
    const existingStaff = await staff.findOne({email})

    if(existingStaff){
        const isMath = await bcrypt.compare(password,existingStaff.password)

        if(isMath){
            const token = jwt.sign(
                {staffId:existingStaff._id},
                process.env.JWT_SECRET
            )
            res.status(200).json({
                message:"Login Successs",
                token,
                staff:{
                      name:existingStaff.name,
                      email:existingStaff.email
                }
            })
        }
        else{
            res.status(401).json("Incorrect Password")
        }
    }
    else{
        res.status(404).json("Staff Not Found")
    }
}