let mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NotificationSchema = new Schema({
  user_id: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  message: {
    type: Schema.Types.String,
    required: true
  },
},
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
