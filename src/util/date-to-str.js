export default function dateToStr(date, local) {
  return local ?
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` :
    `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}
