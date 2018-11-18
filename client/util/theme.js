import colors from './colors';

const {
  smokeyBlack,
  white,
  shadowBlue,
  verdigris,
  japaneseIndigo,
} = colors;

export default {
  lightestColor: white,
  lightColor: verdigris,
  mediumColor: shadowBlue,
  darkColor: japaneseIndigo,
  darkestColor: smokeyBlack,
  _spacer: (multiplier = 1) => typeof multiplier === 'number' ? `${multiplier * 10}px` : '10px',
};