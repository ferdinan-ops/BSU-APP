import mongoose, { Schema, model, models } from "mongoose";

const reportsSchema = Schema({
  userSendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments"
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Reports = models.reports || model("reports", reportsSchema);
export default Reports;