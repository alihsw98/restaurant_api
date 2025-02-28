import { Router } from "express"
import User from "../schmas/user_schema.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const authRouter = Router()
const JWT_SECRET = "asdfjaidfhjaiofhjeiow"

authRouter.post("/register", async (request, response) => {
    try {
        const { username, email, password } = request.body
        const user = await User.findOne({ email })
        if (user) return response.status(400).send(({ msg: "User already exists" }))
        const salt = await bcrypt.genSalt(10)
        const hasehdPassword = await bcrypt.hash(password, salt)

        const newUser = User({
            username,
            email,
            password: hasehdPassword
        })
        await newUser.save()
        response.status(200).send({ msg: "User created successfully" })

    } catch (err) {
        response.status(500).send({ msg: err.message })
    }
})

authRouter.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body
        const user = await User.findOne({ email })
        if (!user) return response.status(400).send({ msg: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return response.status(400).send({ msg: "Invalid credentials" })
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1y" })
        response.status(200).send({ accessToken: token })

    } catch (err) {
        response.status(500).send({ msg: err.message })
    }
})


export default authRouter