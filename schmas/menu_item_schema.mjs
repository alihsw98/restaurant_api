import mongoose from "mongoose";

const menuItemSchema = mongoose.Schema({
    name: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    category: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Double,
    image: mongoose.Schema.Types.String,
})

export const MenuItem = mongoose.model("menuItem", menuItemSchema)
