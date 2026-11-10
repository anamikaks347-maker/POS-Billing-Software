const supplier = require('../models/supplierModel')

exports.addSupplier = async(req,res)=>{
    const {name,email,phone,address} = req.body

    const existingSupplier = await supplier.findOne({email})

    if(existingSupplier){
        res.status(406).json("Already Added!!")
    }
    else{
        const newSupplier = await supplier.create({
            name,email,phone,address
        })
        res.status(200).json(newSupplier)
    }
}

exports.listSupplier = async(req,res)=>{
    const supplierList = await supplier.find()
    res.status(200).json(supplierList)
}

exports.updateSupplier = async(req,res)=>{
    const {sid} = req.params
    const {name,email,phone,address} = req.body

    const updateSupplier = await supplier.findByIdAndUpdate(
        sid,
        {name,email,phone,address},
        {new:true}
    )
    res.status(200).json(updateSupplier)
}

exports.deleteSupplier = async(req,res)=>{
    const {sid} = req.params
    const deleteSupplier = await supplier.findByIdAndDelete(sid)
    res.status(200).json("Deleted Successfully")
}