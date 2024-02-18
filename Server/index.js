const express = require('express');
const app = express();
const mongoose = require("mongoose");
const rootRouter = require("./routes/index")
const cors = require("cors")
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api",rootRouter)


const PORT = process.env.PORT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



