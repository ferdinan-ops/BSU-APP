const Joi = require('joi')

const reportCommentValidation = (payload) => {
  const schema = Joi.object({
    questionId: Joi.string().required(),
    userCommentId: Joi.string().required()
  })
  return schema.validate(payload)
}

const reportQuestionValidation = (payload) => {
  const schema = Joi.object({
    questionId: Joi.string().required(),
    userQuestionId: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = { reportCommentValidation, reportQuestionValidation }
