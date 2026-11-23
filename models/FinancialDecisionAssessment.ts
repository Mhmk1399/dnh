import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const schema = new Schema({
  locale: { type: String, enum: ["fa", "en"], required: true },
  audience: { type: String, required: true },
  decisionTopic: { type: String, required: true },
  currentSituation: { type: String, required: true, maxlength: 2500 },
  decisionSize: String,
  horizon: { type: String, required: true },
  urgency: { type: String, required: true },
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 160 },
  contactMethod: { type: String, required: true },
  contactDetail: { type: String, maxlength: 160 },
  shortDescription: { type: String, required: true, maxlength: 2500 },
  userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });
schema.index({ createdAt: -1 });
export type FinancialDecisionAssessmentRecord = InferSchemaType<typeof schema>;
export default (models.FinancialDecisionAssessment as Model<FinancialDecisionAssessmentRecord> | undefined)
  ?? model("FinancialDecisionAssessment", schema);
