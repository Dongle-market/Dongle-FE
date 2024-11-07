export function formatDeliveryDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' })[0];
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
  return `${formattedDate}(${dayOfWeek})`;
}