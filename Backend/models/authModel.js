import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  images:[
      {
         filename: {
          type: String,
          required: true,
        },
      },
],
firstName: {
  type: String,
  required: true, // Ensure that it is a required field
  default: "",    // Provide a default value to avoid null
},
lastName: {
  type: String,
  required: true,
  default: "",
},
});

const authModel = mongoose.model("user", authSchema);
export default authModel;
