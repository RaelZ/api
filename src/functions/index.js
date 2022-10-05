const { findByEmailOrCPF } = require('./findEmailOrCPF')
const { strongPassword } = require('./strongPassword')
const { statusResponse } = require('./statusResponse')

module.exports = {
  findByEmailOrCPF,
  strongPassword,
  statusResponse
}
