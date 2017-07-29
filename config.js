'use strict'

const os = require('os')

const config = {}

config.hapi = {
  host: os.hostname(),
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