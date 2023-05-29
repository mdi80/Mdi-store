import { Easing } from 'react-native-reanimated';

Easing.quad = t => t * t;
Easing.cubic = t => t * t * t;
Easing.poly = (t, n = 3) => t ** n;
