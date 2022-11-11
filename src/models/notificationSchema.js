import mongoose, { Schema, models, model } from "mongoose";

const notificationSchema = Schema({
  userAction: {
    type: Object,
    default: {
      username: "Admin",
      photo: "https://firebasestorage.googleapis.com/v0/b/bsu-app-26671.appspot.com/o/admin%2Flogo.svg?alt=media&token=34fa2c9a-e7bb-428f-9759-fa9e03556f2f",
      isAdmin: true
    }
  },
  userPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  message: {
    type: String,
    require: true,
  }
}, { timestamps: true });

const Notification = models.notification || model("notification", notificationSchema);
export default Notification;