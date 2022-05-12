# Actions

This is where the business logic of your service should live. Each action file should look something like this:

```JavaScript

/**
 * This function can live somewhere else
 */
const validateUserId = (userId) => {
  if(!userId && !(userId typeof Number)) throw new Error('UserId is not valid')
  return userId
}

/**
 * This is the action
 * userStore is provided by the dependency injection system, and comes from the files defined in
 * src/external/*.js
 */
module.exports = ({ userStore }) => async ({ userId }) => {

  const validatedUserID = validateUserId(userId)

  const user = await userStore.getUserById(validatedUserID)

  return user
}

```
