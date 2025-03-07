import mongoose from "mongoose";
import { BasketItem } from "./basket_item_schema.mjs";
import { MenuItem } from "./menu_item_schema.mjs";
import User from "./user_schema.mjs";
import jwt from "jsonwebtoken";


const basketSchema = new mongoose.Schema({
    items: [BasketItem.Schema],
    user: User.Schema,
})

const Basket = mongoose.model("Basket", basketSchema)

export default Basket