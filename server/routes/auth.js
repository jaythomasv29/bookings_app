import express from "express"
import { register, login } from "../controller/auth.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Auth endpoint")
})

router.post("/register", register)
router.post("/login", login)


export default router