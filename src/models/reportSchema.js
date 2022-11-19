import mongoose, { Schema, model, models } from "mongoose";

const reportsSchema = Schema({
  userSend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  userGet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Reports = models.reports || model("reports", reportsSchema);
export default Reports;