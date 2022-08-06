import express, { Request, Response, Application, NextFunction, ErrorRequestHandler } from 'express'
import { ErrorUserRequestHandler } from './types/errorRequestHandler'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cors from 'cors'

const PORT = 5000
const app: Application = express()
dotenv.config()

// Initial MongoDB connection
const connect = async () => {
  const mongoConnectionString: string = process.env.MONGO_CONNECT || ''
  try {
    await mongoose.connect(mongoConnectionString);
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
app.get("/", (req: Request, res: Response) => {
  res.send("Live on root")
})

// Middlewares
// cookieParser
app.use(cookieParser())
app.use(cors())
/// parse json
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err: ErrorUserRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const errorStatus: any = err.status || 500
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

