const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    subcategories: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Category', categorySchema);