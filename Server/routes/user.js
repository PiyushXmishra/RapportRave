const express = require("express");
const router = express.Router();
const {User} = require("../models/user.model")
const zod = require("zod");
const jwt = require("jsonwebtoken")
require("dotenv").config;

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody =zod.object({
  email:zod.string().email(),
  password:zod.string(),
})

router.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs.", 
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken.",
    });
  }
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  if(user){
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
    return res.json({token:token, userId:user._id  });
  
  }
res.json({
    message: "user created succesfullly",
  });
    
  
})

router.post("/signin" , async function(req,res){
  const {success} = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }
  const user = await User.findOne({
    email:req.body.email,
    password:req.body.password
  })
  if(user){
    const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
    return res.json({token:token , userId: user._id});
  }
  return res.status(411).json({
    message: "error while signin",
  });
})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })

})
  module.exports = router;