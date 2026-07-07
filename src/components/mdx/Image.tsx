interface Props {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function Image({ src, alt, caption, width, height }: Props) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-2xl border border-[rgba(0,127,255,0.1)] shadow-[0_12px_32px_rgba(0,127,255,0.08)]"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
