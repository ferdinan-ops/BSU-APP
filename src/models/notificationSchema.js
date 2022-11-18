import mongoose, { Schema, models, model } from "mongoose";

const notificationSchema = Schema({
  userAction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  message: {
    type: String,
    require: true,
  },
  linkId: {
    type: String,
    require: true,
  }
}, { timestamps: true });

const Notification = models.notification || model("notification", notificationSchema);
export default Notification;