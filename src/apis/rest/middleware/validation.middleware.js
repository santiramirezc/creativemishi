
module.exports = ({ getData, schema }) => (req, res, next) => {
  const data = getData(req)

  const { error, value } = schema.validate(data)

  if (error) {
    error.statusCode = 400
    return next(error)
  }

  req.cleanData = value
  next()
}
