import { model, models, Schema, type Model, type Types } from "mongoose";

export type ContactRecord = { name: string; phone: string; email?: string; subject?: string; message: string; userId?: Types.ObjectId | null; createdAt: Date; updatedAt: Date };

const contactSchema = new Schema<ContactRecord>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, index: true },
    email: { type: String, trim: true, lowercase: true, maxlength: 160 },
    subject: { type: String, trim: true, maxlength: 140 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true },
);

const Contact = (models.Contact as Model<ContactRecord> | undefined) || model<ContactRecord>("Contact", contactSchema);
export default Contact;
