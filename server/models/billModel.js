const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffs',
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        name: String,
        price: Number,
        quantity: Number,
        subtotal: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    billDate: {
        type: Date,
        default: Date.now
    }
})

const bill = mongoose.model('bills', billSchema)

module.exports = bill