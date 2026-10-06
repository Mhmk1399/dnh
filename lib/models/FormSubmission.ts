import { model, models, Schema, type Model, type Types } from "mongoose";
import type { DynamicFieldType } from "@/lib/dynamic-forms";

export type FormSubmissionRecord = {
  formId: Types.ObjectId; formSlug: string; formTitle: string; formRevision: number;
  serviceKey: string; serviceName: string; serviceRoute: string;
  answers: Array<{ fieldId: string; label: string; type: DynamicFieldType; value: string | string[] | boolean }>;
  userId?: Types.ObjectId | null; status: "new" | "read" | "archived"; reference: string; createdAt: Date; updatedAt: Date;
};

const answerSchema = new Schema({ fieldId: String, label: String, type: String, value: Schema.Types.Mixed }, { _id: false });
const submissionSchema = new Schema<FormSubmissionRecord>({
  formId: { type: Schema.Types.ObjectId, ref: "DynamicForm", required: true, index: true },
  formSlug: { type: String, required: true, index: true }, formTitle: { type: String, required: true }, formRevision: { type: Number, required: true },
  serviceKey: { type: String, required: true }, serviceName: { type: String, required: true }, serviceRoute: { type: String, required: true },
  answers: { type: [answerSchema], required: true }, userId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  status: { type: String, enum: ["new", "read", "archived"], default: "new", index: true }, reference: { type: String, required: true, unique: true, index: true },
}, { timestamps: true });
submissionSchema.index({ formId: 1, createdAt: -1 });

const FormSubmission = (models.FormSubmission as Model<FormSubmissionRecord> | undefined) || model<FormSubmissionRecord>("FormSubmission", submissionSchema);
export default FormSubmission;
