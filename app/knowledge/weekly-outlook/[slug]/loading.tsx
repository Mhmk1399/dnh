export default function WeeklyOutlookReportLoading() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f4f8f9] px-5 pt-32 sm:px-8"
    >
      <div className="mx-auto max-w-[980px] border border-line bg-white p-6">
        <div className="h-3 w-32 animate-pulse bg-brand-primary/15" />
        <div className="mt-6 h-9 w-3/4 animate-pulse bg-brand-primary/10" />
        <div className="mt-4 h-9 w-1/2 animate-pulse bg-brand-primary/10" />
        <div className="mt-8 space-y-3">
          <div className="h-4 animate-pulse bg-brand-primary/10" />
          <div className="h-4 animate-pulse bg-brand-primary/10" />
          <div className="h-4 w-2/3 animate-pulse bg-brand-primary/10" />
        </div>
      </div>
    </div>
  );
}
