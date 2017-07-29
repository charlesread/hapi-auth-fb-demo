'use strict'

const Hapi = require('hapi')

const plugins = [
  {
    register: require('hapi-auth-fb'),
    options: {
      client_id: '',
      client_secret: '',
      success: function (credentials) {
        console.log(credentials)
      }
    }
  }
]

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

server.register(plugins, function (err) {
  if (err) {
    throw err
  }
  server.auth.strategy('facebook', 'facebook')

  // an insecure route
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('Welcome to the app! Check out <a href="/secure">/secure</a> to see a secured endpoint.')
    }
  })

  // a secure route, will redirect to FB for auth
  server.route({
    method: 'GET',
    path: '/secure',
    config: {
      auth: 'facebook'
    },
    handler: function (request, reply) {
      const credentials = request.auth.credentials
      return reply(`Hi, ${credentials.first_name}!  Your email address is ${credentials.email} (according to Facebook).`)
    }
  })

  server.start((err) => {

    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})