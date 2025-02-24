import { Router } from "express";
import { MenuItem } from "../schmas/menu_item_schema.mjs";
const menuRouter = Router();

menuRouter.get('/menu', async (request, response) => {
    const { category, name } = request.query
    try {
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

menuRouter.post('/menu', async (request, response) => {
    const { body } = request
    const newMneuItem = new MenuItem(body)

    try {
        await newMneuItem.save()
        return response.status(201).send(newMneuItem);

    } catch (err) {
        console.log(err)
        return response.status(400).send({ msg: err })
    }
})

menuRouter.get("/menu/:id", async (request, response) => {
    try {
        const menuItem = await MenuItem.findById(request.params.id);
        if (!menuItem) return response.status(404).send({ message: "User not found" });
        response.status(200).send(menuItem);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

menuRouter.put("/menu/:id", async (request, response) => {
    try {
        const updatedMneuItem = await MenuItem.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        });
        response.status(200).send(updatedMneuItem);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

menuRouter.delete("/menu/:id", async (request, response) => {
    try {
        await MenuItem.findByIdAndDelete(request.params.id);
        response.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

export default menuRouter;