const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId:{type:String,required:true},
  eventId:{type:String,required:true},
  eventName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String,required: true},
  address: { type: String, require: true },
  pincode: { type: String, require: true },
  eventDate: { type: String, require: true },
  message: { type: String },
  eventStatus:{type:String,default:"Pending"},
  paymentStatus:{type:Boolean,default:false}
});

const EventModel = mongoose.model("EventBooking", eventSchema);

module.exports = {
  EventModel,
};
