const bill = require('../models/billModel')
const product = require('../models/productModel')


console.log("Bill Model:", typeof bill.create)
exports.addBill = async(req,res)=>{
    try{
        console.log("Add Bill Controller Reached")
        console.log("Request Body:", req.body)

        const {staffId,customerName,items,paymentMethod} = req.body

        let totalAmount = 0

        for(let item of items){
            const productData = await product.findById(item.productId)

            if(!productData){
                return res.status(404).json("Product Not Found")
            }

            if(productData.stock < item.quantity){
                return res.status(400).json("Insufficient Stock")
            }

            item.name = productData.name
            item.price = productData.price
            item.subtotal = productData.price * item.quantity

            totalAmount += item.subtotal
        }

        const newBill = await bill.create({
            staffId,
            customerName,
            items,
            totalAmount,
            paymentMethod
        })

        console.log("Bill Saved:", newBill)

        for(let item of items){
            await product.findByIdAndUpdate(
                item.productId,
                {$inc:{stock:-item.quantity}}
            )
        }

        return res.status(200).json(newBill)
    }
    catch(err){
        console.log("BILL ERROR:", err)
        return res.status(500).json({
            message: "Bill Creation Failed",
            error: err.message
        })
    }
}

exports.listBills = async(req,res)=>{
    try{
        const billList = await bill.find()
        res.status(200).json(billList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}

exports.getBill = async(req,res)=>{
    try{
        const {bid} = req.params
        const billData = await bill.findById(bid)
        res.status(200).json(billData)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}