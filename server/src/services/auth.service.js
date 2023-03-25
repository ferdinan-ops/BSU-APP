const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.addUser = async (payload) => {
  return await User.create(payload)
}

exports.hashing = (password) => {
  return bcrypt.hashSync(password, 10)
}

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

exports.checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}
