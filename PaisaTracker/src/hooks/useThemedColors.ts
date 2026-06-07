import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../constants/theme';

const useThemedColors = () => {
  const { theme } = useTheme();
  return colors[theme];
};

export default useThemedColors;
