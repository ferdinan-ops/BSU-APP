const Joi = require('joi')

const userValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    photo: Joi.any()
  })
  return schema.validate(payload)
}

module.exports = { userValidation }
