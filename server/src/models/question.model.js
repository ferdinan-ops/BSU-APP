const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    mataKuliah: {
      type: String,
      require: true
    },
    fakultas: {
      type: String,
      require: true
    },
    programStudi: {
      type: String,
      require: true
    },
    tahunAjaran: {
      type: String,
      require: true
    },
    semester: {
      type: Number,
      require: true
    },
    kategori: {
      type: String,
      require: true
    },
    dosen: {
      type: String,
      require: true
    },
    images: {
      type: [String],
      require: true,
      default: []
    },
    likes: {
      type: [String],
      default: []
    },
    saves: {
      type: [String],
      default: []
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  },
  { timestamps: true }
)

const Question = mongoose.model('question', questionSchema)
module.exports = Question
