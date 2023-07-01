const express=require("express")
const {EventModel}=require("../Model/EventBooking")
const Event=express.Router()

Event.get("/",async(req,res)=>{
    try{
      const data=await EventModel.find()
      res.send(data)
    }
    catch{
        res.send("Error")
    }
})
Event.post("/",async(req,res)=>{
    const payload=req.body
    try{
       const data =new EventModel(payload)
       await data.save()
       res.send(data)
    }
    catch{
        res.send("Post ERRoR")
    }
})
Event.delete("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
    await EventModel.findByIdAndDelete({"_id":id})
    res.send("Delete Success")
    }
    catch{
     res.send("Delete Error")
    }
})

Event.patch("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
    await EventModel.findByIdAndUpdate({"_id":id})
    res.send("Update Success")
    }
    catch{
     res.send("Update Error")
    }
})
module.exports={
    Event
}