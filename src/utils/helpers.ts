// Helper utility functions for PaisaTrack Nepal

import { Expense, Income, Budget, MonthlyStats } from '../types';

export const formatCurrency = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-NP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export const getCurrentMonth = (): number => {
  return new Date().getMonth() + 1;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getMonthName = (month: number): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1] || '';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = getMonthName(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};

export const isCurrentMonth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const current = new Date();
  return (
    date.getMonth() === current.getMonth() &&
    date.getFullYear() === current.getFullYear()
  );
};

export const filterByMonth = <T extends { date: string }>(
  items: T[],
  month: number,
  year: number
): T[] => {
  return items.filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  });
};

export const calculateMonthlyStats = (
  expenses: Expense[],
  income: Income[],
  budgets: Budget[],
  month: number,
  year: number
): MonthlyStats => {
  const monthlyExpenses = filterByMonth(expenses, month, year);
  const monthlyIncome = filterByMonth(income, month, year);

  const totalExpense = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncome = monthlyIncome.reduce((sum, inc) => sum + inc.amount, 0);

  const overallBudget = budgets.find(
    (b) => b.category === 'overall' && b.month === month && b.year === year
  );

  const remainingBudget = overallBudget
    ? overallBudget.limitAmount - totalExpense
    : 0;

  return {
    totalIncome,
    totalExpense,
    netSavings: totalIncome - totalExpense,
    remainingBudget,
  };
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const getBudgetStatus = (
  spent: number,
  limit: number
): 'safe' | 'warning' | 'danger' => {
  const percentage = calculatePercentage(spent, limit);
  if (percentage >= 100) return 'danger';
  if (percentage >= 80) return 'warning';
  return 'safe';
};

export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getTodayString = (): string => {
  return new Date().toISOString();
};

export const sortByDate = <T extends { date: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const getLastSixMonths = (): Array<{ month: number; year: number }> => {
  const result = [];
  const current = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(current.getFullYear(), current.getMonth() - i, 1);
    result.push({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }

  return result;
};
