import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        
        let token = req.headers.authorization.split(" ")[1];
       // token = token.replace("Bearer ", "")
       // console.log(token)

        let decodedData;
        
        if(token ) {
            decodedData = jwt.verify(token , "fsocMemory");
            req.userId = decodedData.id;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;