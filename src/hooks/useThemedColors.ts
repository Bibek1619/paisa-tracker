// Hook to get theme colors based on current theme

import { useTheme } from '../contexts/ThemeContext';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/theme';

export const useThemedColors = () => {
  const { isDark } = useTheme();
  return isDark ? DARK_COLORS : LIGHT_COLORS;
};
