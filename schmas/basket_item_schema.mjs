import mongoose from "mongoose"

const basketItemSchema = mongoose.Schema({
    name: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Double,
    image: mongoose.Schema.Types.String,
    quantity: mongoose.Schema.Types.Int32
})

export const BasketItem = mongoose.model("basketItem", basketItemSchema)