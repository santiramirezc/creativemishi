const User = require('./models/User')
const Project = require('./models/Project')
const Contribution = require('./models/Contribution')

module.exports = ({ logger, envConfig }) => {

  const mongoose = require('mongoose')

  return {
    User,
    Project,
    Contribution,
    connect: () => {
      mongoose.connect(envConfig.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(console.log("Database connected succesfully"))
        .catch(err => console.log(err))
    }
  }

}