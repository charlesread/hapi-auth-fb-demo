'use strict'

const os = require('os')
const ip = require('ip')

const config = {}

config.hapi = {
  host: os.hostname(),
  address: ip.address(),
  port: 8000
}

config.plugin = {
  client_id: '',
  client_secret: '',
  success: function (credentials) {
    console.log(credentials)
  }
}

module.exports = config