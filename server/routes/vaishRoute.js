const express = require("express");
const { getNFTMetaData } = require("../controllers/vaishController");
const axios = require("axios");

const router = express.Router();

router.route("/getNFTData").post(getNFTMetaData);

module.exports = router;
