import { model, models, Schema, type Model, type Types } from "mongoose";

export type DecisionAssessmentRecord = {
  locale: "fa" | "en";
  name: string;
  contact: string;
  behalf: string;
  topic: string;
  horizon: string;
  urgency: string;
  description: string;
  userId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
};

const decisionAssessmentSchema = new Schema<DecisionAssessmentRecord>(
  {
    locale: { type: String, enum: ["fa", "en"], required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    contact: { type: String, required: true, trim: true, maxlength: 160, index: true },
    behalf: { type: String, required: true, trim: true, maxlength: 80 },
    topic: { type: String, required: true, trim: true, maxlength: 160 },
    horizon: { type: String, required: true, trim: true, maxlength: 80 },
    urgency: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1600 },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true },
);

const DecisionAssessment =
  (models.DecisionAssessment as Model<DecisionAssessmentRecord> | undefined) ||
  model<DecisionAssessmentRecord>("DecisionAssessment", decisionAssessmentSchema);

export default DecisionAssessment;
