import mongoose, { Schema, models, model } from "mongoose";

const commentSchema = Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comment: {
    type: String,
    require: true,
  },
}, { timestamps: true });

const Comments = models.comments || model("comments", commentSchema);
export default Comments;