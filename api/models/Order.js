const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true,
        // ref: 'User'
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Item',
            // required: true
        },
        // name: String,
        quantity: {
            type: Number,
            // required: true,
            min: 1,
            default: 1
        },
        // price: Number
    }], 
    amount: {
        type: Number,
        // required: true,
        default: 0
    },
    status: { type: String, default: "pending" },

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order