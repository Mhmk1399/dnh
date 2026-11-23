import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const schema = new Schema({
  locale: { type: String, enum: ["fa", "en"], required: true },
  name: { type: String, required: true, maxlength: 100 },
  phone: { type: String, required: true, index: true },
  email: { type: String, maxlength: 160 },
  communicationMethod: { type: String, required: true },
  audienceType: { type: String, required: true },
  decisionTopic: { type: String, required: true, maxlength: 200 },
  timeHorizon: { type: String, required: true },
  urgency: { type: String, required: true },
  currentSituation: { type: String, required: true, maxlength: 1500 },
  approximateSize: { type: String, maxlength: 200 },
  message: { type: String, required: true, maxlength: 2500 },
  userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });
schema.index({ createdAt: -1 });
export type StrategicConsultationRecord = InferSchemaType<typeof schema>;
export default (models.StrategicConsultation as Model<StrategicConsultationRecord> | undefined)
  ?? model("StrategicConsultation", schema);
