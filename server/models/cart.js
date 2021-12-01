const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    cartId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            productId: String,
            name: String,
            quantity: {
                type: Number,
                min: 0
            },
            price: Number
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Cart', cartSchema);