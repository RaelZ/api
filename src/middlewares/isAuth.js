const { verify } = require("jsonwebtoken")

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "")
    const validToken = verify(token, process.env.JWT_SECRET)
    req.tokenData = validToken
    next()
  } catch {
    res.status(401).json("Unauthorized.")
  }
}
module.exports = { isAuth }
