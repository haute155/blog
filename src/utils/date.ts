const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}
