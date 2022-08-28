const express = require("express")
const UserController = require("../controllers/userController")
const { isAuth } = require("../middlewares/isAuth")

const user = express.Router()

user.post("/users", UserController.create)
user.get("/users", isAuth, UserController.findAll)
user.get("/users/:userId", isAuth, UserController.findOne)
user.put("/users/:userId", isAuth, UserController.update)
user.delete("/users/:userId", isAuth, UserController.destroy)

module.exports = user
