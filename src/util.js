export function parseDateTime(datetime) {
  let [time, date] = datetime.split(" ");
  let [hour, minute, second] = time.split(":");
  let [day, month, year] = date.split("-");

  return new Date(year, parseInt(month)-1, day, hour, minute, second);
}
