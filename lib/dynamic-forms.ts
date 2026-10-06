export const FORM_TYPES = ["single_step", "multi_step", "service_assessment"] as const;
export const FORM_STATUSES = ["draft", "published", "archived"] as const;
export const STEP_TYPES = ["identity", "contact", "questions", "confirmation", "custom"] as const;
export const FIELD_TYPES = ["text", "textarea", "phone", "email", "number", "select", "radio", "checkbox"] as const;

export type DynamicFormType = (typeof FORM_TYPES)[number];
export type DynamicFormStatus = (typeof FORM_STATUSES)[number];
export type DynamicStepType = (typeof STEP_TYPES)[number];
export type DynamicFieldType = (typeof FIELD_TYPES)[number];

export type DynamicFieldDefinition = {
  id: string;
  type: DynamicFieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  minLength?: number;
  maxLength?: number;
};

export type DynamicStepDefinition = {
  id: string;
  title: string;
  description?: string;
  stepType: DynamicStepType;
  fields: DynamicFieldDefinition[];
};

export type DynamicFormDefinition = {
  title: string;
  slug: string;
  description: string;
  formType: DynamicFormType;
  serviceKey: string;
  serviceName: string;
  serviceRoute: string;
  status: DynamicFormStatus;
  steps: DynamicStepDefinition[];
  submitLabel: string;
  successMessage: string;
  revision: number;
};

export type PublicDynamicForm = Omit<DynamicFormDefinition, "status"> & {
  id: string;
};

export function makeStableId(prefix: "step" | "field") {
  return `${prefix}_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
}

export function createFormTemplate(): DynamicFormDefinition {
  return {
    title: "",
    slug: "",
    description: "برای شروع گفت‌وگوی تخصصی، اطلاعات این فرم را تکمیل کنید.",
    formType: "service_assessment",
    serviceKey: "private-wealth-strategy",
    serviceName: "راهبرد ثروت خصوصی",
    serviceRoute: "/services/private-wealth-strategy",
    status: "draft",
    submitLabel: "ثبت درخواست بررسی",
    successMessage: "درخواست شما با موفقیت ثبت شد. مشاوران DNH در اولین فرصت با شما تماس می‌گیرند.",
    revision: 0,
    steps: [
      {
        id: makeStableId("step"),
        title: "مشخصات و راه ارتباطی",
        description: "اطلاعات پایه برای هماهنگی گفت‌وگو",
        stepType: "identity",
        fields: [
          { id: makeStableId("field"), type: "text", label: "نام و نام خانوادگی", required: true, placeholder: "مثلاً آرمان احمدی", minLength: 2, maxLength: 100 },
          { id: makeStableId("field"), type: "phone", label: "شماره موبایل", required: true, placeholder: "۰۹۱۲۱۲۳۴۵۶۷", minLength: 11, maxLength: 20 },
        ],
      },
      {
        id: makeStableId("step"),
        title: "صورت مسئله",
        description: "زمینه تصمیم مالی مورد نظر را شرح دهید",
        stepType: "questions",
        fields: [
          { id: makeStableId("field"), type: "textarea", label: "مهم‌ترین پرسش یا تصمیم شما چیست؟", required: true, placeholder: "شرح کوتاهی از شرایط و هدف خود بنویسید…", minLength: 10, maxLength: 1200 },
        ],
      },
    ],
  };
}

