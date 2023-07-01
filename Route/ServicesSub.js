const express = require("express");
const { ServicesSubModel } = require("../Model/ServicesSub");
const { ServicesMainModel } = require("../Model/ServicesMain");
const ServicesSub = express.Router();

ServicesSub.get("/", async (req, res) => {
  try {
    const data = await ServicesSubModel.find();
    res.send(data);
  } catch {
    res.send("Error");
  }
});
ServicesSub.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const dataMain = await ServicesMainModel.findOne({
      smname: payload.mainname,
    });
    const id = dataMain._id;
    const data = new ServicesSubModel({ ...payload, mainId: id });
    await data.save();
    res.send(data);
  } catch {
    res.send("Post ERRoR");
  }
});

ServicesSub.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ServicesSubModel.findByIdAndDelete({ _id: id });
    res.send("Delete Success");
  } catch {
    res.send("error delete");
  }
});

ServicesSub.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ServicesSubModel.findByIdAndUpdate({ _id: id });
    res.send("Update Success");
  } catch {
    res.send("error Update");
  }
});

module.exports = {
  ServicesSub,
};
