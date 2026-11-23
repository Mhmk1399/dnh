type BuilderSectionPickerProps = {
  label: string;
  items: ReadonlyArray<{ id: string; title: string }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function BuilderSectionPicker({ label, items, selectedIndex, onSelect }: BuilderSectionPickerProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-2 p-4 @min-[50rem]/builder:hidden">
      <label className="block text-sm font-bold text-ink">
        {label}
        <select
          value={selectedIndex}
          onChange={(event) => onSelect(Number(event.target.value))}
          className="mt-2 min-h-11 w-full rounded-xl border border-line bg-white px-3 text-base text-ink focus-visible:outline-focus"
        >
          {items.map((item, index) => (
            <option key={item.id} value={index}>
              {(index + 1).toLocaleString("fa-IR")} · {item.title || "بدون عنوان"}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2 text-sm font-bold text-brand-accent">
        <button type="button" onClick={() => onSelect(selectedIndex)} className="min-h-11 rounded-lg border border-line bg-white px-3">رفتن به ویرایش</button>
        <a href="#builder-preview" className="inline-flex min-h-11 items-center rounded-lg px-3 underline underline-offset-4">پیش‌نمایش</a>
      </div>
    </div>
  );
}
