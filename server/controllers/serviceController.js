const Service = require("../models/serviceModel");

const services = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response) {
      res.status(404).json({ message: "No data found" });
      return;
    }

    res.status(200).json({ msg: response });
  } catch (error) {
    console.log("Error in the service controller: ", error);
  }
};

module.exports = services;
