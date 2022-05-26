const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const optionalString = Joi.string().trim().allow('')

module.exports = {
  schema: Joi.object({
    state: Joi.string().valid('approved', 'closed', 'changes requested', 'waiting for approval'),
    feedback: optionalString,
  }),

  getData: ({ body }) => body,
}
