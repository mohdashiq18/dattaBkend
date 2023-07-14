const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  fname:{ type: String, required: true },
  lname:{ type: String },
  email:{type:String},
  phone: { type: String, required: true },
  email: { type: String },
  address:{type:String,default:null},
  DOB:{type:String,default:null},
  TOB:{type:String,default:null},
  POB:{type:String,default:null}
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = {
  UsersModel,
};
  