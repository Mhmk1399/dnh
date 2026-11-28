import { model, models, Schema, type Model, type Types } from "mongoose";

export type ExecutiveBriefingRequestRecord = {
  locale: "fa" | "en";
  contact: string;
  role: string;
  urgency: string;
  description: string;
  userId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
};

const executiveBriefingRequestSchema = new Schema<ExecutiveBriefingRequestRecord>(
  {
    locale: { type: String, enum: ["fa", "en"], required: true, index: true },
    contact: { type: String, required: true, trim: true, maxlength: 160, index: true },
    role: { type: String, required: true, trim: true, maxlength: 120 },
    urgency: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1600 },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true },
);

const ExecutiveBriefingRequest =
  (models.ExecutiveBriefingRequest as Model<ExecutiveBriefingRequestRecord> | undefined) ||
  model<ExecutiveBriefingRequestRecord>("ExecutiveBriefingRequest", executiveBriefingRequestSchema);

export default ExecutiveBriefingRequest;
