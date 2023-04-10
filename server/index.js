import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.CONNECTION_URL || "mongodb+srv://singh-csm:GIUPM5681K@singh-csm.nmfw5jk.mongodb.net/testfsocmemory", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen( PORT, ()=> console.log(`Server listening on ${PORT} and Database Connected Successfully - fsocMemory`)))
    .catch((error)=> console.log(error.message));

