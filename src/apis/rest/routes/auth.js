const router = require('express').Router()
const passport = require('passport')
const { verifyUser, COOKIE_OPTIONS } = require('../../../util/auth.utils')



router.post('/login', passport.authenticate('local'), async (req, res) => {
  const loginAction = req.scope.resolve('loginAction')
  const response = await loginAction({ userid: req.user._id })
  if (response.status === 200) {
    res.cookie("refreshToken", response.refreshToken, COOKIE_OPTIONS);
    res.send({ success: true, user: response.user });
  } else {
    console.log("Login bad :(")
    res.statusCode = response.status;
    res.send(response);
  }
})

/**
 * @swagger
 * /auth/register:
 *  post:
*    summary: Create user
*    requestBody:
*      description: Create user
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              nombre:
*                type: string
*                required: true
*              username:
*                type: string
*                required: true
*              password:
*                type: string
*                required: true
*    responses:
*      200:
*        description: Create User
*        content:
*          application/json:
*            status
* 
 */

router.post('/register', async (req, res) => {
  const data = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  }
  const register = req.scope.resolve('userRegisterAction')
  const response = await register(data)
  if (response.status !== 200) {
    res.statusCode = response.status
    res.send(response)
  } else {
    res.cookie("refreshToken", response.refreshToken, COOKIE_OPTIONS)
    res.send({ success: true, user: response.user })
  }
})



router.post("/refreshToken", async (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    console.log("EY obtuvimos el refreshToken como:")
    console.log(refreshToken)
    const refreshTokenAction = req.scope.resolve('refreshTokenAction')
    const response = await refreshTokenAction({ refreshToken })
    if (response.status !== 200) {
      res.statusCode = response.status;
      res.send(response);
    } else {
      res.cookie("refreshToken", response.newRefreshToken, COOKIE_OPTIONS);
      res.send({ success: true, user: response.user });
    }
  } else {
    res.statusCode = 401;
    res.send({ success: false, comment: "No refreshToken received :(" });
  }
});

router.put('/password', async (req, res) => {
  const username = req.body.username
  const oldpassword = req.body.oldpassword
  const newpassword = req.body.newpassword
  const chgpwdAction = req.scope.resolve('changePasswordAction')
  const response = await chgpwdAction({ username, oldpassword, newpassword })
  if (!response.ok) {
    res.statusCode = response.status;
    res.send(response);
  } else {
    res.send({ success: true, comment: response.comment })
  }
})

router.post("/logout", verifyUser, async (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken && req.user._id) {
    console.log("Loggin out, refreshToken received:")
    console.log(refreshToken)
    const logoutAction = req.scope.resolve('logoutAction')
    const response = await logoutAction({ refreshToken, userId: req.user._id })
    if (response.status !== 200) {
      res.statusCode = response.status;
      res.send(response);
    } else {
      res.clearCookie("refreshToken", COOKIE_OPTIONS);
      res.send({ success: true });
    }
  } else {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.send({ success: true, comment: "No refreshToken cookie or session found" });
  }
})


module.exports = router


