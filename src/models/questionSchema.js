import mongoose, { Schema, models, model } from "mongoose";

const questionSchema = Schema({
  mataKuliah: {
    type: String,
    require: true,
  },
  fakultas: {
    type: String,
    require: true,
  },
  programStudi: {
    type: String,
    require: true,
  },
  tahunAjaran: {
    type: String,
    require: true,
  },
  semester: {
    type: Number,
    require: true,
  },
  kategori: {
    type: String,
    require: true,
  },
  dosen: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: true,
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  saved: {
    type: [String],
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
}, { timestamps: true });

const Questions = models.questions || model("questions", questionSchema);
export default Questions;