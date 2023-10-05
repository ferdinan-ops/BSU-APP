const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  photo: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  provider: {
    type: String,
    default: 'local'
  }
})

const User = mongoose.model('user', userSchema)
module.exports = User
