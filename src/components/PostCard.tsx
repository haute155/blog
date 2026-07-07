interface Props {
  href: string;
  title: string;
  description: string;
  pubDate: string;
  tag?: string;
}

export default function PostCard({
  href,
  title,
  description,
  pubDate,
  tag = "Tech",
}: Props) {
  return (
    <a
      href={href}
      className="flex flex-col gap-[14px] rounded-[20px] border border-[rgba(0,127,255,0.1)] bg-white/90 p-6 shadow-[0_12px_32px_rgba(0,127,255,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[rgba(0,127,255,0.25)]"
    >
      <span className="bg-brand-soft text-brand inline-flex w-fit items-center rounded-full px-[10px] py-1.5 text-[13px] font-bold">
        {tag}
      </span>
      <h3 className="text-text text-[22px] leading-[1.3] font-bold">{title}</h3>
      <p className="text-muted">{description}</p>
      <div className="text-muted text-sm">{pubDate}</div>
    </a>
  );
}
