import mongoose from "mongoose";


let userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  }
});
let User = mongoose.model("User", userSchema);
export default User;
