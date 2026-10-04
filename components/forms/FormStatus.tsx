import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FormStatus({ kind, message, reference }: { kind: "success" | "error"; message: string; reference?: string }) {
  const Icon = kind === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div role={kind === "error" ? "alert" : "status"} className={`flex items-start gap-3 border px-4 py-3 text-sm leading-7 ${kind === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-red-300 bg-red-50 text-red-900"}`}>
      <Icon className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
      <div><p>{message}</p>{reference && <p dir="ltr" className="mt-1 text-[10px] font-bold tracking-[0.16em] opacity-70">REF / {reference}</p>}</div>
    </div>
  );
}
