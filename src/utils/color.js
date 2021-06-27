/* eslint-disable import/prefer-default-export */

export function getColorFromPct(value, reverse = false) {
  // value from 0 to 1
  const hue = ((reverse ? value : 1 - value) * 120).toString(10);
  return ['hsl(', hue, ',100%,50%)'].join('');
}
