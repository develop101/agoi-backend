let mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AdminNotificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: Schema.Types.String,
    required: true
  },
},
  { timestamps: true }
);

const Notification = mongoose.model("AdminNotification", AdminNotificationSchema);

module.exports = Notification;
