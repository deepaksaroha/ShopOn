import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "any"]
    },
    cart: [
        {
            productId: String,
            name: String,
            quantity: {
                type: Number,
                min: 1
            },
            price: Number
        }
    ],
    addresses:[String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('User', userSchema);