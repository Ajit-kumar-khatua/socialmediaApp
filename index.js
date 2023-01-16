
const express=require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authentication.middleware");
const { postRouter } = require("./routes/posts.router");
const { userRouter } = require("./routes/user.route");
require('dotenv').config()
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)


app.use(authenticate)
app.use("/posts",postRouter)


app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to DB");
        
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})