import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(!userExist)  return res.status(404).send({ status:false, message: 'User not found' });
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if(!isPasswordMatch)  return res.status(400).send({ status:false, message: 'Invalid Credentials!' });

        const token = jwt.sign({ email: userExist.email, id: userExist._id}, "fsocMemory", { expires: "2h"});

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
        if( password !== confirmPassword ) return res.status(400).send({ status:false, message: 'Password does not match!' });

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, id: newUser._id}, "fsocMemory", { expires : "2h" });

        return res.status(200).send({ status: "Success", result: newUser, token: token });

    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong!"})
    }
}