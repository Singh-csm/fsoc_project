import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
    try {
        
        let token = req.headers.authorization.split(" ")[1];
       // token = token.replace("Bearer ", "")
       // console.log(token)

        let decodedData;
        
     
            decodedData = jwt.verify(token , "fsocMemory");
            req.userId = decodedData.id;
            req.user = await User.findById(decodedData.id);
           
            
        

        next();
    } catch (error) {
        console.log(error.message)
    }
}

export default auth;