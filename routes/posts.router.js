
const { request } = require("express")
const express=require("express")
const {PostModel}=require("../models/post.model")


const postRouter=express.Router()



postRouter.get("/",async (req,res)=>{
    let query=req.query
    console.log(query.device)
    try {
        let userID=req.body.userID
        const data=await PostModel.find({$or:[{userID},{device:query.device}]})
        res.send(data)
        
    } catch (error) {
        console.log(error);
    }
})



postRouter.post("/create", async (req,res)=>{
    const payload=req.body
    try {
        const post=new PostModel(payload)
        await post.save()
        res.send("Post Created")
    } catch (error) {
        console.log(error);
    }
})

postRouter.patch("/update/:id",async (req,res)=>{
    let id=req.params.id;
    let payload=req.body;
    try {
        const post= await PostModel.findByIdAndUpdate({_id:id},payload)
        res.send("Post updated Sucessfully.")   
    } catch (error) {
       console.log(error);
    }
 })
 

postRouter.delete("/delete/:id",async (req,res)=>{
   let id=req.params.id;
   try {
       const post= await PostModel.findByIdAndDelete({_id:id})
       res.send({"msg":"Post Deleted Sucessfully."})   
   } catch (error) {
      console.log(error);
   }
})

module.exports={
    postRouter
}