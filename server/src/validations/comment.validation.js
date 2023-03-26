const Joi = require('joi')

const createCommentValidation = (payload) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    questionId: Joi.string().required(),
    userQuestionId: Joi.string().required()
  })
  return schema.validate(payload)
}

const updateCommentValidation = (payload) => {
  const schema = Joi.object({ comment: Joi.string().required() })
  return schema.validate(payload)
}

module.exports = { createCommentValidation, updateCommentValidation }
