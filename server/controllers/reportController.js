const bill = require('../models/billModel')
const returns = require('../models/returnModel')
const product = require('../models/productModel')
const staff = require('../models/staffModel')

exports.getReports = async(req,res)=>{
    try{
        const totalBills = await bill.countDocuments()

        const sales = await bill.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{$sum:'$totalAmount'}
                }
            }
        ])

        const refund = await returns.aggregate([
            {
                $group:{
                    _id:null,
                    totalRefund:{$sum:'$refundAmount'}
                }
            }
        ])

        const totalProducts = await product.countDocuments()
        const totalStaff = await staff.countDocuments()

        res.status(200).json({
            totalBills,
            totalSales: sales[0]?.totalSales || 0,
            totalReturns: await returns.countDocuments(),
            totalRefund: refund[0]?.totalRefund || 0,
            totalProducts,
            totalStaff
        })
    }
    catch(err){
        res.status(500).json(err.message)
    }
}