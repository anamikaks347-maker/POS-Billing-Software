const returns = require('../models/returnModel')
const bill = require('../models/billModel')
const product = require('../models/productModel')

exports.addReturn = async(req,res)=>{
    try{
        const {billId,productId,quantity} = req.body

        // Find Bill
        const billData = await bill.findById(billId)

        if(!billData){
            return res.status(404).json("Bill Not Found")
        }

        // Find Product in Bill
        const billItem = billData.items.find(
            item => item.productId.toString() === productId
        )

        if(!billItem){
            return res.status(404).json("Product Not Found in Bill")
        }

        if(quantity <= 0){
            return res.status(400).json("Invalid Quantity")
        }

        // Check Previous Returns
        const previousReturns = await returns.find({
            billId, productId
        })

        let returnedQuantity = 0

        previousReturns.forEach(item=>{
            returnedQuantity += item.quantity
        })

        if(returnedQuantity + quantity > billItem.quantity){
            return res.status(400).json("Return Quantity Exceeded")
        }

        const refundAmount = billItem.price * quantity

        const newReturn = await returns.create({
            billId,
            productId,
            productName: billItem.name,
            quantity,
            refundAmount
        })

        // Increase Product Stock
        await product.findByIdAndUpdate(
            productId,
            {$inc:{stock:quantity}}
        )

        res.status(200).json(newReturn)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

exports.listReturns = async(req,res)=>{
    try{
        const returnList = await returns.find()
        res.status(200).json(returnList)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}