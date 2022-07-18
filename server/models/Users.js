import mongoose from "mongoose";

import { Schema } from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
 

},
{ timestamps: true }
)