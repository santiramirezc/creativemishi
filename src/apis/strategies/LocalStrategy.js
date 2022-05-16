const passport = require("passport");
const bcrypt = require('bcrypt')
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../external/models/User");

const authenticateUser = async (username, password, done) => {
  console.log("Intentando autenticar usuario")
  const user = await User.findOne({ username })
  if (user == null) {
    return done(null, false, { message: 'No user with that email' })
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Password incorrect' })
    }
  } catch (e) {
    return done(e)
  }
}

passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser(async (username, done) => {
  const user = await User.findOne({ username })
  return done(null, user)
})


module.exports = { authenticateUser }
