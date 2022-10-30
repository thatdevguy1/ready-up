const express = require("express");
const router = express.Router();
const roomsCtrl = require("../../controllers/rooms");

router.post("/", roomsCtrl.create);

module.exports = router;
