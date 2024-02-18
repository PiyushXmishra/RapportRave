const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   
      email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
      },
      password: {
        type: String,
        required: true,
        min: 8,
      },
      firstName:{
        type:String,
        required:true,
      },
      lastName:{
        type:String,
        required:true,
      }
})
const User = mongoose.model("User", userSchema);

module.exports = {
    User
}