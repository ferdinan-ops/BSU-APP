const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    comment: {
      type: String,
      require: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

commentSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment
