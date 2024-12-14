const express = require("express");
const userRoute = express.Router();
const { createUser, findUser, deleteUser, logIn, updateUser } = require("../controllers/user.controller");

userRoute.post("/createUser", createUser);
userRoute.post("/findUser", findUser);
userRoute.delete("/deleteUser", deleteUser);
userRoute.post("/logIn", logIn);
userRoute.post("/updateUser", updateUser);


module.exports = userRoute;