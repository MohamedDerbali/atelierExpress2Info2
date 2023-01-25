const express = require("express");
const router = express.Router();
const os = require("os");

router.get("/", (req, res, next) => {
  try {
    const osInformations = {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
    };
    if (!osInformations) {
      throw new Error("the os does not have any informations!");
    }
    res.status(200).json(osInformations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/cpus", (req, res, next) => {
  try {
    const cpusList = os.cpus();
    if (cpusList && cpusList.length === 0) {
      throw new Error("no cpus found!");
    }
    res.status(200).json(cpusList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/cpus/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const cpusList = os.cpus();
    if (cpusList && cpusList.length === 0) {
      throw new Error("no cpus found!");
    }
    if (id < 0 || id > 7) {
      throw new Error("you must specify a valid id!");
    }
    res.status(200).json(cpusList[id]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
