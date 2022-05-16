const swaggerJSDoc = require('swagger-jsdoc')
const packageJson = require('../../../package.json')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local',
      },
    ],
  },
  apis: [
    './src/apis/rest/routes/**/*.js',
    './src/apis/rest/app.js',
  ],
}

module.exports = swaggerJSDoc(options)
