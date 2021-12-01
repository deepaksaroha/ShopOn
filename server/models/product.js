const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        min: 0,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    specification: [
        {
            propertyName: String,
            propertyValue: String
        }
    ],
    categories: [String],
    seller: String,
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);