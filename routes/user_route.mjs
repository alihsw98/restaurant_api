import { Router } from "express"
import User from "../schmas/user_schema.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import fs from "fs"

const authRouter = Router()
const JWT_SECRET = "asdfjaidfhjaiofhjeiow"

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });



authRouter.get("/profile", veirifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).send({ msg: "User not found" });

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});

authRouter.put("/profile", veirifyToken, upload.single("profileImage"), async (req, res) => {
    try {
        const { username, email, fullName, bio } = req.body;
        const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, profileImage, fullName, bio },
            { new: true, omitUndefined: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).send({ msg: "User not found" });

        res.status(200).send({ msg: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
});


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



export default authRouter