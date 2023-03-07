const express = require('express')
const path = require('path')

const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger-docs')
const DIContainer = require('../../main')
const container = DIContainer()
const passport = require('passport')


require('../strategies/JwtStrategy');
require('../strategies/LocalStrategy');

const app = express()

app.use((req, _res, next) => {
  req.scope = container.createScope()
  return next()
})


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser("process.env.COOKIE_SECRET"));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);

      //      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize())


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'))
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * Determines the status code for the response for an error
 *
 * @param {Error} error error
 * @returns {number} status code for error
 */
const determineStatusCodeFromError = (error) => error.statusCode || 500

app.use((error, req, res, next) => {
  console.log(error)
  res.status(determineStatusCodeFromError(error)).json({
    error: error.message,
    status: determineStatusCodeFromError(error),
  })
})

module.exports = app
