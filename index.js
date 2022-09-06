const express = require('express');
const app = express();
const mongoose = require("mongoose");

const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");
const path = require("path");
// const cors = require('cors');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
   },()=>{
    console.log("connected to MongoDB");
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

//Middelwares 

// app.use(cors());
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(morgan("common"));
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
       
        cb(null,file.originalname);
    }
});

const upload = multer({storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        return res.status(200).json("file has been uploaded successfully");
    }catch(error){
        console.log(error);
    }
});

app.listen(8800, ()=>{
    console.log("Backend server is running");
});