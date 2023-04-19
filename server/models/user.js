import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
       required: true,
    },
    password: {
        type: String,
       required: true,
    },
    resetPasswordToken :String,
    resetPasswordExpires: Date,
   
})

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };



var User = mongoose.model("User", userSchema)

export default User;

