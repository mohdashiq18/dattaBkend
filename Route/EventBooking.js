const express=require("express")
const {EventModel}=require("../Model/EventBooking")
const Event=express.Router()
const {UsersModel}=require("../Model/User")
Event.get("/",async(req,res)=>{
    try {
        const { query } = req.query; 
    
        let data;
    
        if (query) {
          data = await EventModel.find({
            $or: [
              { eventDate: { $regex: query, $options: 'i' } },
              { phone: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
              { pincode: { $regex: query, $options: 'i' } },
              { eventStatus: { $regex: query, $options: 'i' } }
            ]
          }).sort({ eventDate: 'asc' }).exec();
        } else {
          data = await EventModel.find().sort({ eventDate: 'asc' }).exec();
        }
      
        const sortedData = data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.eventDate.split('/');
          const [dayB, monthB, yearB] = b.eventDate.split('/');
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          return dateB - dateA;
        });
      
        res.send(sortedData); 
      }
    catch(err){
        res.send("Error")
        console.log(err)
    }
})


Event.get("/:id",async(req,res)=>{
    const id=req.params.id 
    try{
        const data = await EventModel.find({userId:id}).sort({ eventDate: 'asc' });
        const sortedData = data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.eventDate.split('/');
          const [dayB, monthB, yearB] = b.eventDate.split('/');
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          return dateB - dateA;
        });
        res.send(sortedData);
    }
    catch{
        res.send("Error")
    }
}) 
Event.get("/users/:id",async(req,res)=>{
  const id=req.params.id 
  try{
      const data = await EventModel.find({eventId:id}).sort({ eventDate: 'asc' });
      const sortedData = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.eventDate.split('/');
        const [dayB, monthB, yearB] = b.eventDate.split('/');
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
        return dateB - dateA;
      });
      res.send(sortedData);
  }
  catch{
      res.send("Error")
  }
})  
Event.post("/",async(req,res)=>{
    const payload=req.body

    let check=await UsersModel.find({phone:payload.phone})
    try{
        if(check.length==0){
            const user=new UsersModel({phone:payload.phone,fname:payload.fname,lname:payload.lname?payload.lname:"",email:payload.email?payload.email:""})
            await user.save()
            console.log("user save")
         }
         const userid=await UsersModel.find({phone:payload.phone})
         const id=userid[0]._id
       const data =new EventModel({...payload,userId:id})
       await data.save()
       res.send(data)
    }
    catch{
        res.send("err")
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
    const payload=req.body
    try{
    await EventModel.findByIdAndUpdate({"_id":id},payload)
    res.send("Update Success")
    }
    catch{
     res.send("Update Error")
    }
})
module.exports={
    Event
}