const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String,  },
  userId: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String},
  address: { type: String, default: null },
  pincode: { type: String, default: null},
  appointmentDate: { type: String, default: "Any Time" },
  message: { type: String,require: true },
  authorMessage: { type: String,require: true },
  appointmentStatus: { type: String, default: "Pending" },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema); 

module.exports = {
  AppointmentModel,
};
