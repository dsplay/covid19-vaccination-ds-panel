function kFormatter(number) {
  return `${(number / 1e3).toFixed(1).replace('.0', '')}k`;
}

function mFormatter(number) {
  return `${(number / 1e6).toFixed(1).replace('.0', '')}M`;
}

function bFormatter(number) {
  return `${(number / 1e9).toFixed(1).replace('.0', '')}B`;
}

export default function NumberFormatter(number) {
  if (number > 999999999) return bFormatter(number);
  if (number > 999999) return mFormatter(number);
  if (number > 999) return kFormatter(number);
}
