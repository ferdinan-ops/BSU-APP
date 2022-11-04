import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

const Users = models.users || model("users", userSchema);
export default Users;