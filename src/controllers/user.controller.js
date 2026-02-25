const User = require('../models/user.model')
const bcrypt = require('bcrypt')


// 🔹 Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" })

        const existing = await User.findOne({ email })
        if (existing)
            return res.status(400).json({ message: "Email already exists" })

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashed
        })

        res.status(201).json({
            message: "User registered",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}


// 🔹 Get All
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}


// 🔹 Get by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.json(user)
    } catch {
        res.status(400).json({ message: "Invalid ID" })
    }
}


// 🔹 Update
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.json(user)
    } catch {
        res.status(400).json({ message: "Invalid ID" })
    }
}


// 🔹 Delete
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user)
            return res.status(404).json({ message: "User not found" })

        res.json({ message: "User deleted" })
    } catch {
        res.status(400).json({ message: "Invalid ID" })
    }
}