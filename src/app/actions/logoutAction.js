const jwt = require("jsonwebtoken")
const { getToken, getRefreshToken } = require('../../util/auth.utils')

module.exports = ({ db }) => async ({ refreshToken, userId }) => {

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