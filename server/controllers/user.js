import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail  from "../middleware/sendEmail.js"


import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(!userExist)  return res.status(404).send({ status:false, message: 'User not found' });
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if(!isPasswordMatch)  return res.status(400).send({ status:false, message: 'Invalid Credentials!' });

        const token = jwt.sign({ email: userExist.email, id: userExist._id}, "fsocMemory", { expiresIn: "1h"});

        return res.status(200).send({ status: "Success", result: userExist, token: token });

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong!"})
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(userExist)  return res.status(400).send({ status:false, message: 'User Already Exists!' });
       // if( password !== confirmPassword ) return res.status(400).send({ status:false, message: 'Password does not match!' });

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, id: newUser._id}, "fsocMemory", { expiresIn: "1h" });

        return res.status(201).send({   newUser, token });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: "Something went wrong!"})
    }
}


export const forgotPassword = async (req,res)=>{
    try{
    
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        const resetPasswordToken = user.getResetPasswordToken();
    
        await user.save();
     
        const resetUrl = `${req.protocol}://${req.get(
          "host"
        )}/user/password/reset/${resetPasswordToken}`;
    
        const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
    
        try {
          await sendEmail({
            email: user.email,
            subject: "Reset Password",
            message,
          });
    
          res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
          });
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save();
    
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
    
    
    }catch(err){
        res.status(500).send({success :false,message:err.message});
    }
    
    }



 export const resetPassword = async (req, res) => {
        try {
          const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");
      
          const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
          });
      
          if (!user) {
            return res.status(401).json({
              success: false,
              message: "Token is invalid or has expired",
            });
          }
      
          user.password = req.body.password;
      
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          await user.save();
      
          res.status(200).json({
            success: true,
            message: "Password Updated",
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      };