const Joi = require('joi')

const questionValidation = (payload) => {
  const schema = Joi.object({
    mataKuliah: Joi.string().required(),
    fakultas: Joi.string().required(),
    programStudi: Joi.string().required(),
    tahunAjaran: Joi.string().required(),
    semester: Joi.number().required(),
    kategori: Joi.string().required(),
    dosen: Joi.string().required(),
    images: Joi.any(),
    userId: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = { questionValidation }
