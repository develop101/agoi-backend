let mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserNotificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: Schema.Types.String,
    required: true
  },
  status: {
    type: Schema.Types.Boolean,
    default: false,
  },
},
  { timestamps: true }
);

const UserNotification = mongoose.model("UserNotification", UserNotificationSchema);

module.exports = UserNotification;
