const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  fname:{ type: String, required: true },
  lname:{ type: String },
  email:{type:String},
  phone: { type: String, required: true },
  email: { type: String }
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = {
  UsersModel,
};
  