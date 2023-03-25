const Joi = require('joi')

const registerValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().allow('', null),
    photo: Joi.string().allow('', null),
    isAdmin: Joi.boolean().allow('', null)
  })
  return schema.validate(payload)
}

const loginValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

module.exports = { registerValidation, loginValidation }
