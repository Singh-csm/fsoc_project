import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import cloudinary from "cloudinary";

const app = express();
dotenv.config()
cloudinary.config({ 
    cloud_name: "du7f2xnv0",
    api_key: "795942125436498",
    api_secret: "fi_l6bHfIGx_L-eKf_FeRAPsmFk"
})

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen( PORT, ()=> console.log(`Server listening on ${PORT} and Database Connected Successfully - toastfsocMemory`)))
    .catch((error)=> console.log(error.message));

