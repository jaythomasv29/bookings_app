import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'

const PORT = 5000
const app = express()
dotenv.config()

// Initial MongoDB connection
const connect = async () => {
  console.log(process.env.MONGO_CONNECT)
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log('connected')
  } catch (err) {
    console.log("error connecting to db");
    throw err
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected")
})
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

// Routes
app.get("/", (req, res) => {
  res.send("Live on root")
})

// Middlewares


/// parse json
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(PORT, () => {
  connect()
  console.log('app listening on port ' + PORT);
})

