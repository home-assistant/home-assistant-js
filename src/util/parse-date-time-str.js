export default function parseDateTime(datetime) {
  const [time, date] = datetime.split(' ');
  const [hour, minute, second] = time.split(':');
  const [day, month, year] = date.split('-');

  return new Date(Date.UTC(year, parseInt(month, 10) - 1, day, hour, minute, second));
}
