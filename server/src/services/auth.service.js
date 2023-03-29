const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const addUser = async (payload) => {
  return await User.create(payload)
}

const hashing = (password) => {
  return bcrypt.hashSync(password, 10)
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

module.exports = { addUser, hashing, findUserByEmail, checkPassword }
