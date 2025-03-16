import { Router } from "express";
import { MenuItem } from "../schmas/menu_item_schema.mjs";
import User from "../schmas/user_schema.mjs";
import jwt from "jsonwebtoken"
const menuRouter = Router();
const JWT_SECRET = "asdfjaidfhjaiofhjeiow"

menuRouter.get('/menu', veirifyToken, async (request, response) => {
    const { category, name, page = 1, limit = 10 } = request.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    try {
        const user = await User.findById(request.user.id).select("-password");
        if (!user) return response.status(401).send({ msg: "Access Token Required" });

        let query = {};
        if (category) query.category = { $regex: new RegExp(category, "i") };
        if (name) query.name = { $regex: new RegExp(name, "i") };

        const totalItems = await MenuItem.countDocuments(query);
        const menuItems = await MenuItem.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        return response.status(200).send({
            totalItems,
            totalPages: Math.ceil(totalItems / limitNumber),
            currentPage: pageNumber,
            menuItems
        });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
});


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
    console.log(token)
    if (!token) return response.status(401).send({ msg: "Access Token Requird" })
    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET)
        request.user = decoded
        next()
    } catch (err) {
        response.status(400).send({ msg: "Invalid Token" })
    }
}

export default menuRouter;