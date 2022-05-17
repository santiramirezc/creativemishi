const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { getToken, getRefreshToken } = require('../../util/auth.utils')

module.exports = ({ db }) => ({

  get: async ({ username }) => {
    try {
      console.log("Buscando: " + username)
      const user = await db.User.findOne({ username })
      if (user) {
        const projects = await db.Project.find({ $or: [{ createdBy: username }, { 'admins.username': { $in: username } }] })
        const userDTO = { username: user.username, name: user.name, role: user.role, projects }
        return { status: 200, comment: '', user: userDTO }
      }
    } catch (e) {
      return { status: 500, error: e.toString() }
    }
  },

  login: async ({ userid }) => {
    const token = getToken({ _id: userid })
    const refreshToken = getRefreshToken({ _id: userid })

    try {

      console.log("Buscando: " + userid)
      const user = await db.User.findById(userid)
      if (user) {
        console.log("Login good")
        user.refreshToken.push({ refreshToken })
        await user.save()
        const projects = await db.Project.find({ $or: [{ createdBy: user.username }, { 'admins.username': { $in: user.username } }] })
        const userDTO = { username: user.username, name: user.name, role: user.role, token, projects }
        return { status: 200, comment: 'Login sucessfull', refreshToken, user: userDTO }
      }
    } catch (e) {
      console.log("login bad")
      return { status: 500, error: e.toString() }
    }
  },

  register: async ({ name, username, password }) => {

    console.log("Buscando: " + username)
    const isUsernameTaken = await db.User.findOne({ username })
    if (isUsernameTaken) {
      return { status: 403, comment: 'Username has been taken already' }
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new db.User({
        name,
        username,
        password: hashedPassword,
      })

      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });
      user.refreshToken.push({ refreshToken });

      await user.save()
      console.log("User created")
      const userDTO = { username: user.username, name: user.name, role: user.role, token }
      return { status: 200, comment: 'User created', refreshToken, user: userDTO }
    } catch (e) {
      return { status: 500, error: e.toString() }
    }
  },

  refreshToken: async ({ refreshToken }) => {

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      )
      const userId = payload._id
      const user = await db.User.findById(userId)
      console.log("User db refreshTokens: ")
      console.log(user.refreshToken)
      if (user) {
        // Find the refresh token against the user record in database
        const tokenIndex = user.refreshToken.findIndex(
          (item) => item.refreshToken === refreshToken
        );

        if (tokenIndex === -1) {
          return { status: 401, comment: 'Unathorized, refresh token not found' }

        } else {
          const token = getToken({ _id: userId });
          // If the refresh token exists, then create new one and replace it.
          const newRefreshToken = getRefreshToken({ _id: userId });
          user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
          await user.save()
          const projects = await db.Project.find({ $or: [{ createdBy: user.username }, { 'admins.username': { $in: user.username } }] })
          const userDTO = { username: user.username, name: user.name, role: user.role, token, projects }
          return { status: 200, comment: 'Token refreshed sucessfully', newRefreshToken, user: userDTO }
        }
      } else {
        return { status: 401, comment: 'Unathorized, user not found' }
      }

    } catch (err) {
      return { status: 500, comment: "Error on refreshToken action " + err.toString() }
    }

  },

  changePassword: async ({ username, oldpassword, newpassword }) => {

    const user = await db.User.findOne({ username })
    if (!user) {
      return { status: 400, comment: 'No user with this username' }
    }

    try {
      if (await bcrypt.compare(oldpassword, user.password)) {
        //Change password
        const hashedPassword = await bcrypt.hash(newpassword, 10)
        user.password = hashedPassword
        await user.save()
        return { ok: true, status: 200, comment: "Password changed successfully" }
      } else {
        return { ok: false, status: 401, comment: 'Password incorrect' }
      }
    } catch (e) {
      return { ok: false, status: 500, comment: e.toString() }
    }
  },

  logout: async ({ refreshToken, userId }) => {

    try {

      const user = await db.User.findById(userId)
      if (user) {
        // Find the refresh token against the user record in database
        const tokenIndex = user.refreshToken.findIndex(
          (item) => item.refreshToken === refreshToken
        );

        if (tokenIndex !== -1) {
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }
        await user.save()
        return { status: 200, comment: 'Refresh token removed sucessfully' }
      } else {
        return { status: 401, comment: 'Unathorized, user not found' }
      }

    } catch (err) {
      return { status: 500, comment: "Error on logout action " + err.toString() }
    }

  }

})