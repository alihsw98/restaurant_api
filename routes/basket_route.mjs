import { Router } from "express"
import { BasketItem } from "../schmas/basket_item_schema.mjs"
import { MenuItem } from "../schmas/menu_item_schema.mjs"
import User from "../schmas/user_schema.mjs"
import jwt from "jsonwebtoken"

const basketRoute = Router()
const JWT_SECRET = "asdfjaidfhjaiofhjeiow"

basketRoute.get('/basket', veirifyToken, async (request, response) => {

    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })
        const basketItems = await BasketItem.find()
        return response.status(200).send(basketItems)
    } catch (err) {
        return response.status(400).send({ msg: err })
    }

})

basketRoute.post('/basket', veirifyToken, async (request, response) => {

    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })
        const menuItem = await MenuItem.findById(request.body.id);
        if (menuItem) {
            console.log(menuItem)
            const newBasketItem = new BasketItem({
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                quantity: request.body.quantity,
            })
            await await newBasketItem.save();
            return response.status(201).send(newBasketItem)

        } else {
            return response.status(404).send({ msg: "item not found" })
        }

    } catch (err) {
        console.log(err)
        return response.status(400).send({ msg: err })
    }

})

function veirifyToken(request, response, next) {
    const token = request.header("Authorization")
    if (!token) return response.status(401).send({ msg: "Access Token Requird" })
    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET)
        request.user = decoded
        next()
    } catch (err) {
        response.status(400).send({ msg: "Invalid Token" })
    }
}

export default basketRoute