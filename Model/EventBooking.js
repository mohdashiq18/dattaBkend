const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  eventName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, require: true },
  district: { type: String, require: true },
  pincode: { type: String, require: true },
  eventDate: { type: String, require: true },
  message: { type: String },
});

const EventModel = mongoose.model("EventBooking", eventSchema);

module.exports = {
  EventModel,
};
