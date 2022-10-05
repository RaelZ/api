const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const dotenv = require('dotenv')
const { auth } = require('./controllers/authController')

dotenv.config()

const PORT = process.env.PORT || 3500
const app = express()

app.use(express.json())
app.use(cors())

routes.forEach((route) => app.use(route))

app.listen(PORT, async () => {
  console.log(`API is running at ${PORT}!`)
})
