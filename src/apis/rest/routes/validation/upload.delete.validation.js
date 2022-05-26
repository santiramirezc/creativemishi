const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const optionalString = Joi.string().trim()

module.exports = {
  schema: Joi.object({
    fileName: requiredString,
  }),

  getData: ({ body }) => body,
}
