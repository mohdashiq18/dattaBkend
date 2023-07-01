const mongoose=require("mongoose")
const Connect=mongoose.connect("mongodb+srv://ashiq:Rashiq@cluster0.bqvhbdc.mongodb.net/dattasai?retryWrites=true&w=majority")
module.exports={
    Connect
}