import { READING_LEVELS, READING_LEVEL_META, type ReadingLevel } from "@/lib/reading-level";

export function ReadingLevelPicker({
  value,
  onChange,
  disabled,
}: {
  value: ReadingLevel;
  onChange: (level: ReadingLevel) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      {READING_LEVELS.map((lvl) => {
        const m = READING_LEVEL_META[lvl];
        const active = value === lvl;
        return (
          <button
            key={lvl}
            type="button"
            disabled={disabled}
            onClick={() => onChange(lvl)}
            className={`flex w-full items-start gap-3 rounded-2xl border-2 p-3 text-left transition-all disabled:opacity-50 ${
              active
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:bg-secondary/40"
            }`}
          >
            <span className="text-xl leading-none">{m.emoji}</span>
            <span className="min-w-0">
              <span className={`block text-sm font-black ${active ? "text-primary" : ""}`}>
                {m.label}
              </span>
              <span className="block text-[11px] text-muted-foreground">{m.blurb}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
