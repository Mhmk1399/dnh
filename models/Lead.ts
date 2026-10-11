import { model, models, Schema, type Model, type Types } from "mongoose";

export type LeadRecord = { name: string; phone: string; text: string; userId?: Types.ObjectId | null; createdAt: Date; updatedAt: Date };

const leadSchema = new Schema<LeadRecord>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, index: true },
    text: { type: String, required: true, trim: true, maxlength: 1200 },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true },
);

const Lead = (models.Lead as Model<LeadRecord> | undefined) || model<LeadRecord>("Lead", leadSchema);
export default Lead;
