const Joi = require('joi')

const requiredString = Joi.string().required().trim()

module.exports = {
  schema: Joi.object({
    contactId: requiredString,
    contactIdType: requiredString.valid('sfid', 'jdeid', 'hrid', 'npi', 'chgid'),
  }),
  /**
   * @param {object} req request object
   * @param {object} req.query query params of request
   * @returns {object} query params of request
   */
  getData: ({ query }) => query,
}
