const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: String,
            name: String,
            quantity: {
                type: Number,
                min: 0
            },
            price: Number,
        }
    ],
    total: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ["Active", "Cancelled", "Completed"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Order', orderSchema);