const express=require("express")
const {UsersModel}=require("../Model/User")
const UsersRoute=express.Router()
const {AppointmentModel}=require("../Model/Appoiment")
const {EventModel}=require("../Model/EventBooking")
UsersRoute.get("/",async(req,res)=>{
    try{
      const data=await UsersModel.find()
      res.send(data)
    }
    catch{
        res.send("Error")
    }
})
// UsersRoute.post("/",async(req,res)=>{
//     const payload=req.body
//     try{
//        const data =new UsersModel(payload)
//        await data.save()
//        res.send(data)
//     }
//     catch{
//         res.send("Post ERRoR")
//     }
// })

UsersRoute.delete("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
        await AppointmentModel.deleteMany({ userId: id });
        await EventModel.deleteMany({ userId: id });
        await UsersModel.findByIdAndDelete({"_id":id})
    res.send("Delete Success")
    }
    catch{
     res.send("Delete Error")
    }
})

UsersRoute.patch("/:id",async(req,res)=>{
    const id=req.params.id 
    const payload =req.body
    try{
    await UsersModel.findByIdAndUpdate({"_id":id},payload)
    res.send("Update Success")
    }
    catch{
     res.send("Update Error")
    }
})

module.exports={
    UsersRoute
}