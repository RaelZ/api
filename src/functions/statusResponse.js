const { responses } = require('../utils')

const statusResponse = (res, status, object) => {
  const response = {
    message: responses[status],
    data: object
  }
  return res.status(status).json(response)
}

module.exports = { statusResponse }
