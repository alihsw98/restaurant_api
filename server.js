import express from "express";
import mongoose from "mongoose";
import menuRouter from "./routes/menu_route.mjs";
import basketRoute from "./routes/basket_route.mjs";

const PORT = 8000

const app = express()
mongoose.connect("mongodb://localhost:27017/restaurant_api")
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(`db connection error: ${err}`))

app.use(express.json())
app.use(menuRouter)
app.use(basketRoute)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server running on port ${PORT}`)
})