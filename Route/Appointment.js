const express=require("express")
const {AppointmentModel}=require("../Model/Appoiment")
const Appointment=express.Router()

Appointment.get("/",async(req,res)=>{
    try{
      const data=await AppointmentModel.find()
      res.send(data)
    }
    catch{
        res.send("Error")
    }
})
Appointment.post("/",async(req,res)=>{
    const payload=req.body
    try{
       const data =new AppointmentModel(payload)
       await data.save()
       res.send(data)
    }
    catch{
        res.send("Post ERRoR")
    }
})

Appointment.delete("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
    await AppointmentModel.findByIdAndDelete({"_id":id})
    res.send("Delete Success")
    }
    catch{
     res.send("Delete Error")
    }
})

Appointment.patch("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
    await AppointmentModel.findByIdAndUpdate({"_id":id})
    res.send("Update Success")
    }
    catch{
     res.send("Update Error")
    }
})

module.exports={
    Appointment
}