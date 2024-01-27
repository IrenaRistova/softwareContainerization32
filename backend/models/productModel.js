import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required:true,
        },
        size: {
            type: String,
            required: true,
        },
        expiryYear:{
            type: Number,
            required:true
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model('Pump', productSchema);