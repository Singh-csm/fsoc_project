import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL = "mongodb+srv://singh-csm:GIUPM5681K@singh-csm.nmfw5jk.mongodb.net/fsocMemory";
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen( PORT, ()=> console.log(`Server listening on ${PORT} and Database Connected Successfully - fsocMemory`)))
    .catch((error)=> console.log(error.message));

