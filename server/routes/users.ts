import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

import { updateUser, deleteUser, getUserById, getUsers } from "../controller/user.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   return res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send('hello user, you are logged in as an admin and can delete all accounts')
// })

// GET ALL Users
router.get("/", verifyAdmin, getUsers);

// UPDATE BY ID
router.put("/:id", verifyUser, updateUser);

// DELELTE BY ID
router.delete("/:id", verifyUser, deleteUser);

// GET BY ID
router.get("/:id", verifyUser, getUserById);



export default router