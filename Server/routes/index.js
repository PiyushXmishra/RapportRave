const express = require('express');
const userRouter = require("./user")
const router = express.Router();
const messageRoutes = require("./msgroute");
const google = require('./OAuth');

router.use("/user" , userRouter);
router.use("/messages", messageRoutes);
router.use("/auth", google)

module.exports = router;



