import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning";

const config: Record<CalloutType, { label: string; className: string }> = {
  info: {
    label: "안내",
    className: "border-brand/20 bg-brand-soft text-text",
  },
  tip: {
    label: "팁",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  warning: {
    label: "주의",
    className: "border-amber-200 bg-amber-50 text-amber-900",
  },
};

interface Props {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export default function Callout({ type = "info", title, children }: Props) {
  const { label, className } = config[type];

  return (
    <div className={`my-6 rounded-2xl border p-5 ${className}`}>
      <p className="mb-1 text-sm font-bold uppercase tracking-wide opacity-60">
        {title ?? label}
      </p>
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}
