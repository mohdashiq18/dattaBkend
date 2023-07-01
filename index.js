const  express=require("express")
const Connect=require("./Config/Config")
const app=express()
const {ServicesMain} = require("./Route/ServicesMain")
const {ServicesSub} = require("./Route/ServicesSub")
const {Event} =require("./Route/EventBooking")
const {Appointment}=require("./Route/Appointment")
const cors=require("cors")
app.use(express.json())
app.use(
    cors({
        origin:"*",
    })
)

app.use("/main",ServicesMain)
app.use("/sub",ServicesSub)
app.use("/event",Event)
app.use("/appointment",Appointment)

app.listen(8080,async(req,res)=>{
    try{
     await Connect
     console.log("Server Running PORT 8080")
    }
    catch{
        console.log("Server Error")
    }
})