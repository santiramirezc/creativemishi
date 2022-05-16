const bcrypt = require('bcrypt')
const { getToken, getRefreshToken } = require('../../util/auth.utils')

module.exports = ({ db }) => async ({ userid }) => {

  const token = getToken({ _id: userid })
  const refreshToken = getRefreshToken({ _id: userid })

  try {

    console.log("Buscando: " + userid)
    const user = await db.User.findById(userid)
    console.log(user)
    if (user) {
      console.log("Login good")
      user.refreshToken.push({ refreshToken })
      await user.save()
      const userDTO = { username: user.username, name: user.name, role: user.role, token }
      return { status: 200, comment: 'Login sucessfull', refreshToken, user: userDTO }
    }
  } catch (e) {
    console.log("login bad")
    return { status: 500, error: e.toString() }
  }

}