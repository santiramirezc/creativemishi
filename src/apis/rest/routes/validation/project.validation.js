const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const optionalString = Joi.string().trim()

module.exports = {
  schema: Joi.object({
    projectId: requiredString,
    uuid: Joi.string().guid({ version: ['uuidv4'] }).trim(),
    name: requiredString,
    description: optionalString,
    admins: Joi.array().items({
      username: requiredString,
      role: requiredString.valid('admin')
    })
  }),

  getData: ({ body }) => body,
}
