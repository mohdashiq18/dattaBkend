const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  userId: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String},
  address: { type: String, require: true },
  pincode: { type: String, require: true },
  appointmentDate: { type: String, require: true },
  message: { type: String },
  appointmentStatus: { type: String, default: "Pending" },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = {
  AppointmentModel,
};
