const express = require("express");
const { HoroModel } = require("../Model/Horoscope");
const Horo = express.Router();
const { UsersModel } = require("../Model/User");
Horo.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    let data;

    if (query) {
      data = await HoroModel.find({
        $or: [
          { DOB: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { pincode: { $regex: query, $options: "i" } },
          { TOB: { $regex: query, $options: "i" } },
          { POB: { $regex: query, $options: "i" } },
          { horoStatus: { $regex: query, $options: "i" } },
        ],
      })
        .sort({ horoDate: "asc" })
        .exec();
    } else {
      data = await HoroModel.find().sort({ horoDate: "asc" }).exec();
    }

    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.horoDate.split("/");
      const [dayB, monthB, yearB] = b.horoDate.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateB - dateA;
    });

    res.send(sortedData);
  } catch (error) {
    console.error(error);
    res.send("Error");
  }
});

Horo.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await HoroModel.find({ userId: id }).sort({
      horoDate: "asc",
    });
    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.horoDate.split("/");
      const [dayB, monthB, yearB] = b.horoDate.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateB - dateA;
    });
    res.send(sortedData);
  } catch {
    res.send("Error");
  }
});
Horo.post("/", async (req, res) => {
  const payload = req.body;
  let check = await UsersModel.find({ phone: payload.phone });
  console.log(check);
  try {
    if (check.length == 0) {
      const user = new UsersModel({
        phone: payload.phone,
        fname: payload.fname,
        lname: payload.lname ? payload.lname : "",
        email: payload.email ? payload.email : "",
        DOB: payload.DOB,
        TOB: payload.TOB,
        nakshatra:payload.nakshatra,
        POB: payload.POB,
        address: payload.address,
      });
      await user.save();
      console.log("user save");
    }
   
    const userid = await UsersModel.find({ phone: payload.phone });
    const id = userid[0]._id;
    if (!userid[0].address) {
      await UsersModel.findByIdAndUpdate(
        { _id: id },
        { address: payload.address}
      );
    }
    if (!userid[0].DOB ) {
      await UsersModel.findByIdAndUpdate(
        { _id: id },
        { DOB: payload.DOB  }
      );
    }
    if (!userid[0].TOB ) {
        await UsersModel.findByIdAndUpdate(
          { _id: id },
          { TOB: payload.TOB  }
        );
      }
      if (!userid[0].POB ) {
        await UsersModel.findByIdAndUpdate(
          { _id: id },
          { POB: payload.POB  }
        );
      } 
      if(!check[0].nakshatra){
        await UsersModel.findByIdAndUpdate(
          { _id: id },
          { nakshatra:payload.nakshatra  }
        );
      }
      const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

// Add leading zero to month if necessary
const formattedMonth = month < 10 ? `0${month}` : month;

const formattedDate = `${day}/${formattedMonth}/${year}`;



    const data = new HoroModel({ ...payload, userId: id,horoDate:formattedDate});
    await data.save();
    res.send(data);
  } catch (err) {
    res.send("Post ERRoR");
    console.log(err);
  }
});

Horo.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await HoroModel.findByIdAndDelete({ _id: id });
    res.send("Delete Success");
  } catch {
    res.send("Delete Error");
  }
});

Horo.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await HoroModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Update Success");
  } catch {
    res.send("Update Error");
  }
});

module.exports = {
  Horo,
};
