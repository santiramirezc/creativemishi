const bcrypt = require('bcrypt')

module.exports = ({ db }) => async ({ username, oldpassword, newpassword }) => {

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
}