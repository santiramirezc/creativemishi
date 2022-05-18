const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const requiredNumber = Joi.number().required()
const optionalString = Joi.string().trim()

module.exports = {
  schema: Joi.object({
    name: requiredString,
    description: optionalString,
    part: requiredNumber,
  }),

  getData: ({ body }) => body,
}
