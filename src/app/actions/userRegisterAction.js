const bcrypt = require('bcrypt')
const { getToken, getRefreshToken } = require('../../util/auth.utils')

module.exports = ({ db }) => async ({ name, username, password }) => {

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

}