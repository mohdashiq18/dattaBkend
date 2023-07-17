const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String,  },
  userId:{type:String,required:true},
  eventId:{type:String,required:true},
  eventName: { type: String, required: true },
  phone: { type: String, required: true },
  bookingDate:{ type: String, required: true },
  email: { type: String},
  pincode: { type: String, require: true },
  eventDate: { type: String, require: true },
  message: { type: String },
  eventStatus:{type:String,default:"Pending"},
  image:{type:String,default:null},
  paymentStatus:{type:Boolean,default:false},
  ammount:{type:Number,default:0},
  address: { type: String, require: true },
  authorMessage: { type: String,default: null }
});

const EventModel = mongoose.model("EventBooking", eventSchema);

module.exports = {
  EventModel,
};
