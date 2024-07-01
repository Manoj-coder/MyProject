// src/utils/responsive.js

import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guidelines based on standard screen sizes
const guidelineBaseWidth = 375; // Standard width (iPhone 11)

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
