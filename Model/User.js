const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name:{ type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String }
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = {
  UsersModel,
};
  