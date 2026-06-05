// Theme constants for PaisaTrack Nepal

export const LIGHT_COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  tertiary: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F5F7FA',
  backgroundLight: '#FAFBFC',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  accent: {
    blue: '#2563EB',
    green: '#10B981',
    orange: '#F59E0B',
    red: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899',
    cyan: '#06B6D4',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const DARK_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  tertiary: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#0F172A',
  backgroundLight: '#1E293B',
  white: '#1E293B',
  black: '#FFFFFF',
  cardBg: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  accent: {
    blue: '#3B82F6',
    green: '#10B981',
    orange: '#F59E0B',
    red: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899',
    cyan: '#06B6D4',
  },
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

// Default to light theme
export const COLORS = LIGHT_COLORS;

// Dark Mode Colors
export const DARK_COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  tertiary: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#0F172A',
  backgroundLight: '#1E293B',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#1E293B',
  accent: {
    blue: '#3B82F6',
    green: '#10B981',
    orange: '#F59E0B',
    red: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899',
    cyan: '#06B6D4',
  },
  gray: {
    50: '#1E293B',
    100: '#334155',
    200: '#475569',
    300: '#64748B',
    400: '#94A3B8',
    500: '#CBD5E1',
    600: '#E2E8F0',
    700: '#F1F5F9',
    800: '#F8FAFC',
    900: '#FFFFFF',
  },
};

// Helper function to get colors based on theme
export const getColors = (isDark: boolean) => isDark ? DARK_COLORS : COLORS;

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#EF4444',
  Transport: '#3B82F6',
  Rent: '#8B5CF6',
  Shopping: '#EC4899',
  Education: '#F59E0B',
  Health: '#10B981',
  Entertainment: '#F97316',
  'Mobile Recharge': '#14B8A6',
  Internet: '#6366F1',
  Others: '#6B7280',
  overall: '#2563EB',
};

export const CATEGORY_ICONS: Record<string, string> = {
  Food: 'food',
  Transport: 'bus',
  Rent: 'home',
  Shopping: 'cart',
  Education: 'book',
  Health: 'medical',
  Entertainment: 'film',
  'Mobile Recharge': 'phone-portrait',
  Internet: 'wifi',
  Others: 'ellipsis-horizontal',
};

export const PAYMENT_METHOD_ICONS: Record<string, string> = {
  Cash: 'cash',
  eSewa: 'wallet',
  Khalti: 'wallet',
  Bank: 'card',
  Fonepay: 'wallet',
};

export const INCOME_SOURCE_ICONS: Record<string, string> = {
  Salary: 'briefcase',
  Freelance: 'laptop',
  Business: 'trending-up',
  Gift: 'gift',
  Other: 'cash',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
