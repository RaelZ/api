const auth = require("./authRoute")
const userAccountRoute = require("./userAccountRoute")
const user = require("./usersRoute")

const routes = [auth, user, userAccountRoute]

module.exports = routes
