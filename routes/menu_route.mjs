import { Router } from "express";
import { MenuItem } from "../schmas/menu_item_schema.mjs";
import User from "../schmas/user_schema.mjs";
const menuRouter = Router();
const JWT_SECRET = "asdfjaidfhjaiofhjeiow"

menuRouter.get('/menu', veirifyToken, async (request, response) => {
    const { category, name } = request.query
    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })
        let menuItems = await MenuItem.find();

        if (category) {
            menuItems = menuItems.filter(item => item.category.toLocaleLowerCase() == category.toLowerCase())
        }
        if (name) {
            menuItems = menuItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
        }
        return response.status(200).send(menuItems)
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
})

menuRouter.post('/menu', veirifyToken, async (request, response) => {
    const { body } = request
    const newMneuItem = new MenuItem(body)

    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })

        await newMneuItem.save()
        return response.status(201).send(newMneuItem);

    } catch (err) {
        console.log(err)
        return response.status(400).send({ msg: err })
    }
})

menuRouter.get("/menu/:id", veirifyToken, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })

        const menuItem = await MenuItem.findById(request.params.id);
        if (!menuItem) return response.status(404).send({ message: "item not found" });
        response.status(200).send(menuItem);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

menuRouter.put("/menu/:id", veirifyToken, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })

        const updatedMneuItem = await MenuItem.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        });
        response.status(200).send(updatedMneuItem);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

menuRouter.delete("/menu/:id", veirifyToken, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select("-password")
        if (!user) return response.status(401).send({ msg: "Access Token Required" })

        await MenuItem.findByIdAndDelete(request.params.id);
        response.status(200).send({ message: "Item deleted successfully" });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

function veirifyToken(request, response, next) {
    const token = request.header("Authorization")
    if (!token) return response.status(401).send({ msg: "Access Token Requird" })
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        request.user = decoded
        next()
    } catch (err) {
        response.status(400).send({ msg: "Invalid Token" })
    }
}

export default menuRouter;