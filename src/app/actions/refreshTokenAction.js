const jwt = require("jsonwebtoken")
const { getToken, getRefreshToken } = require('../../util/auth.utils')

module.exports = ({ db }) => async ({ refreshToken }) => {

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
        const userDTO = { username: user.username, name: user.name, role: user.role, token }
        return { status: 200, comment: 'Token refreshed sucessfully', newRefreshToken, user: userDTO }
      }
    } else {
      return { status: 401, comment: 'Unathorized, user not found' }
    }

  } catch (err) {
    return { status: 500, comment: "Error on refreshToken action " + err.toString() }
  }

}