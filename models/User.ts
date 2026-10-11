import { model, models, Schema, type Model } from "mongoose";

export type UserRecord = {
  firstName: string;
  lastName: string;
  phone: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserRecord>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 70 },
    phone: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
  },
  { timestamps: true },
);

const User = (models.User as Model<UserRecord> | undefined) || model<UserRecord>("User", userSchema);
export default User;
