require('dotenv').config()

// 🔥 Debug line (temporary)
console.log("ENV URI:", process.env.MONGO_URI)

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/user.routes')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})