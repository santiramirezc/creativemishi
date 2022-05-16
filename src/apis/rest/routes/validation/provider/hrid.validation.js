const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const optionalString = Joi.string().trim()

module.exports = {
  schema: Joi.object({
    jdeid: optionalString,
    sfid: requiredString,
  }),
  /**
   * @param {object} req request object
   * @param {object} req.body body request params
   * @returns {object} validated body
   */
  getData: ({ body }) => body,
}
