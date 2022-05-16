const Joi = require('joi')

const requiredString = Joi.string().required().trim()
const optionalString = Joi.string().trim()

module.exports = {
  schema: Joi.object({
    id: Joi.string().guid({ version: ['uuidv4'] }).trim(),
    lastName: requiredString,
    firstName: requiredString,
    legalName: requiredString,
    phone: requiredString,
    email: requiredString.email(),
    activeLicenses: requiredString,
    contactId: requiredString,
    contactIdType: requiredString.valid('sfid'),
    division: requiredString.uppercase(),
    jdeid: optionalString,
    middleName: optionalString,
    title: optionalString,
    birthdate: optionalString,
    address1: optionalString,
    address2: optionalString,
    city: optionalString,
    stateProvince: optionalString,
    postalCode: optionalString,
    county: optionalString,
    country: optionalString,
    ssn: optionalString,
    type: optionalString,
    dlState: optionalString,
    dlNumber: optionalString,
    inactiveLicenses: optionalString,
    npiNumber: optionalString,
    certifications: optionalString,
    degree: optionalString,
    namex: optionalString,
  }),
  /**
   * @param {object} req request object
   * @param {object} req.body body of request
   * @returns {object} body of request
   */
  getData: ({ body }) => body,
}
