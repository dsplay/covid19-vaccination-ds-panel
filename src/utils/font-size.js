const ref = 1920;
const largerSide = Math.max(window.innerHeight, window.outerWidth);
const rootFontSize = Math.ceil(16 * (largerSide / ref));
document.querySelector('html').style.fontSize = `${rootFontSize}px`;
