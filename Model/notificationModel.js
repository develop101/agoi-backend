let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  context: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), required: true }
});

const UserNotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  notification: {
    type: Schema.Types.ObjectId,
    ref: "Notification"
  },
  readAt: { type: Date, required: true, default: Date.now() }
});

module.exports = {
  Notification: mongoose.model("Notification", NotificationSchema),
  UserNotification: mongoose.model("UserNotification", UserNotificationSchema)
};



// export enum Severity {
//     high = "high",
//     low = "low",
//     med = "med",
//   }
  
//   export enum NotificationStatus {
//     seen = "seen",
//     unseen = "unseen",
//     created = "created",
//   }
  
//   @Entity()
//   export class notification {
//     public constructor(init?: Partial<notification>) {
//       Object.assign(this, init);
//     }
  
//     @PrimaryGeneratedColumn()
//     Id?: number;
  
//     @Column()
//     Title: string;
  
//     @Column()
//     Discription?: string;
  
//     @Column({
//       default: Severity.low,
//       enum: Severity,
//       type: "enum",
//     })
//     Severity: Severity;
  
  
//     @Column({
//       default: NotificationStatus.created,
//       enum: NotificationStatus,
//       type: "enum",
//     })
//     NotificationStatus: NotificationStatus;
  
  
//     @Column()
//     StaffId: number
  
//     @Column()
//     RelatedData?: string;
  
//     @CreateDateColumn({ type: "timestamp" })
//     public CreatedAt?: Date;
  
//     @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
//     public UpdatedAt?: Date;
  
//     @ManyToOne(() => staff, staff => staff.Notification)
//     @JoinColumn({ name: "StaffId" })
//     Staff: staff
  
//   }