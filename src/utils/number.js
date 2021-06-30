/* eslint-disable  import/prefer-default-export */
function formatWithUnitPrefix(number, divisor, unitPrefix) {
  return `${(number / divisor).toFixed(1).replace('.0', '')}${unitPrefix}`;
}

export function formatBigValue(number) {
  if (number > 999999999) return formatWithUnitPrefix(number, 1e9, 'B');
  if (number > 999999) return formatWithUnitPrefix(number, 1e6, 'M');
  if (number > 999) return formatWithUnitPrefix(number, 1e3, 'k');
  return number;
}
