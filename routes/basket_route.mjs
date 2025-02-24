import { response, Router } from "express"
import { BasketItem } from "../schmas/basket_item_schema.mjs"
import { MenuItem } from "../schmas/menu_item_schema.mjs"

const basketRoute = Router()

basketRoute.get('/basket', async (request, response) => {

    try {
        const basketItems = await BasketItem.find()
        return response.status(200).send(basketItems)
    } catch (err) {
        return response.status(400).send({ msg: err })
    }

})

basketRoute.post('/basket', async (request, response) => {

    try {
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
export default basketRoute