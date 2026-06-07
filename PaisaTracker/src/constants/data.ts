import { ExpenseCategory, PaymentMethod, IncomeSource } from '../types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Rent',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Shopping',
  'Investment',
  'Other',
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  'Cash',
  'eSewa',
  'Khalti',
  'Fonepay',
  'Bank',
  'Card',
];

export const INCOME_SOURCES: IncomeSource[] = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Rent',
  'Gift',
  'Other',
];

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Food: 'food',
  Transport: 'car',
  Rent: 'home',
  Utilities: 'lightbulb',
  Entertainment: 'movie',
  Healthcare: 'medical-bag',
  Education: 'school',
  Shopping: 'shopping',
  Investment: 'trending-up',
  Other: 'dots-horizontal',
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#FF6B6B',
  Transport: '#4ECDC4',
  Rent: '#45B7D1',
  Utilities: '#FFA07A',
  Entertainment: '#98D8C8',
  Healthcare: '#F06292',
  Education: '#7986CB',
  Shopping: '#FFD93D',
  Investment: '#6BCF7F',
  Other: '#95A5A6',
};
