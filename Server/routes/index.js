const express = require('express');
const userRouter = require("./user")
const router = express.Router();
const messageRoutes = require("./msgroute")
router.use("/user" , userRouter);
router.use("/messages", messageRoutes);

module.exports = router;



