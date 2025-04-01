import { cx } from "@/components/utils/cx";

export interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  progressClassName?: string;
  valueFormatter?: (
    value: number,
    valueInPercentage: number,
  ) => string | number;
}

export const ProgressBar = ({
  value,
  min = 0,
  max = 100,
  className,
  progressClassName,
}: ProgressBarProps) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cx(
        "h-2 w-full overflow-hidden rounded-md bg-quaternary",
        className,
      )}
    >
      <div
        // Use transform instead of width to avoid layout thrashing (and for smoother animation)
        style={{ transform: `translateX(-${100 - percentage}%)` }}
        className={cx(
          "size-full rounded-md bg-fg-brand-primary transition duration-75 ease-linear",
          progressClassName,
        )}
      />
    </div>
  );
};

export const ProgressBarTextRight = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
}: ProgressBarProps) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className="flex items-center gap-3">
      <ProgressBar min={min} max={max} value={value} />
      <span className="text-sm font-medium text-secondary tabular-nums">
        {valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}
      </span>
    </div>
  );
};

export const ProgressBarTextBottom = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
}: ProgressBarProps) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className="flex flex-col items-end gap-2">
      <ProgressBar min={min} max={max} value={value} />
      <span className="text-sm font-medium text-secondary tabular-nums">
        {valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`}
      </span>
    </div>
  );
};

export const ProgressBarTextTopFloating = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
}: ProgressBarProps) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className="relative flex flex-col items-end gap-2">
      <ProgressBar min={min} max={max} value={value} />
      <div
        style={{ left: `${percentage}%` }}
        className="absolute -top-2 -translate-x-1/2 -translate-y-full rounded-lg bg-primary_alt px-3 py-2 shadow-lg ring-1 ring-border-secondary_alt"
      >
        <div className="text-xs font-semibold text-secondary tabular-nums">
          {valueFormatter
            ? valueFormatter(value, percentage)
            : `${percentage}%`}
        </div>
      </div>
    </div>
  );
};

export const ProgressBarTextBottomFloating = ({
  value,
  min = 0,
  max = 100,
  valueFormatter,
}: ProgressBarProps) => {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className="relative flex flex-col items-end gap-2">
      <ProgressBar min={min} max={max} value={value} />
      <div
        style={{ left: `${percentage}%` }}
        className="absolute -bottom-2 -translate-x-1/2 translate-y-full rounded-lg bg-primary_alt px-3 py-2 shadow-lg ring-1 ring-border-secondary_alt"
      >
        <div className="text-xs font-semibold text-secondary">
          {valueFormatter
            ? valueFormatter(value, percentage)
            : `${percentage}%`}
        </div>
      </div>
    </div>
  );
};
