const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const paymentRoute = require("./paymentRoute");
const productRoute = require("./productRoute");
const vaishRoute = require("./vaishRoute");
const notesRoute = require("./notesRoute");

// Mount individual routers for each route group
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/payment", paymentRoute);
router.use("/product", productRoute);
router.use("/vaishapitest", vaishRoute);
router.use("/notes", notesRoute);

module.exports = router;
