const mongoose = require('mongoose')

const returnSchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bills',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    refundAmount: {
        type: Number,
        required: true
    },
    returnDate: {
        type: Date,
        default: Date.now
    }
})

const returns = mongoose.model('returns', returnSchema)

module.exports = returns