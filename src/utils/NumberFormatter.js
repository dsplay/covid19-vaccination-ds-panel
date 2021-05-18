function generateNumberFormat(number, divisor, measure) {
  return `${(number / divisor).toFixed(1).replace('.0', '')}${measure}`;
}

export default function numberFormatter(number) {
  if (number > 999999999) return generateNumberFormat(number, 1e9, 'B');
  if (number > 999999) return generateNumberFormat(number, 1e6, 'M');
  if (number > 999) return generateNumberFormat(number, 1e3, 'k');
  return number;
}
