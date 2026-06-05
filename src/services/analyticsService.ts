// Analytics Service for calculating insights and statistics

import {
  Expense,
  Income,
  Budget,
  CategoryBreakdown,
  MonthlyTrend,
  Insight,
  ExpenseCategory,
} from '../types';
import {
  filterByMonth,
  getLastSixMonths,
  getMonthName,
  calculatePercentage,
} from '../utils/helpers';
import { CATEGORY_COLORS } from '../constants/theme';

export const calculateCategoryBreakdown = (
  expenses: Expense[],
  month: number,
  year: number
): CategoryBreakdown[] => {
  const monthlyExpenses = filterByMonth(expenses, month, year);
  const totalAmount = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryMap = new Map<ExpenseCategory, number>();

  monthlyExpenses.forEach((expense) => {
    const current = categoryMap.get(expense.category) || 0;
    categoryMap.set(expense.category, current + expense.amount);
  });

  const breakdown: CategoryBreakdown[] = [];
  categoryMap.forEach((amount, category) => {
    breakdown.push({
      category,
      amount,
      percentage: calculatePercentage(amount, totalAmount),
      color: CATEGORY_COLORS[category],
    });
  });

  return breakdown.sort((a, b) => b.amount - a.amount);
};

export const calculateMonthlyTrends = (
  expenses: Expense[],
  income: Income[]
): MonthlyTrend[] => {
  const months = getLastSixMonths();

  return months.map(({ month, year }) => {
    const monthlyExpenses = filterByMonth(expenses, month, year);
    const monthlyIncome = filterByMonth(income, month, year);

    const totalExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalIncome = monthlyIncome.reduce((sum, inc) => sum + inc.amount, 0);

    return {
      month: getMonthName(month).substring(0, 3),
      income: totalIncome,
      expense: totalExpense,
      savings: totalIncome - totalExpense,
    };
  });
};

export const generateInsights = (
  expenses: Expense[],
  income: Income[],
  budgets: Budget[],
  currentMonth: number,
  currentYear: number
): Insight[] => {
  const insights: Insight[] = [];

  // Current month data
  const currentExpenses = filterByMonth(expenses, currentMonth, currentYear);
  const currentIncome = filterByMonth(income, currentMonth, currentYear);
  const currentTotal = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const incomeTotal = currentIncome.reduce((sum, inc) => sum + inc.amount, 0);

  // Previous month data
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const prevExpenses = filterByMonth(expenses, prevMonth, prevYear);
  const prevTotal = prevExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Compare with previous month
  if (prevTotal > 0) {
    const diff = ((currentTotal - prevTotal) / prevTotal) * 100;
    if (diff > 10) {
      insights.push({
        id: 'spending_increase',
        type: 'warning',
        message: `You spent ${Math.round(diff)}% more this month compared to last month.`,
        icon: 'trending-up',
      });
    } else if (diff < -10) {
      insights.push({
        id: 'spending_decrease',
        type: 'success',
        message: `Great! You spent ${Math.abs(Math.round(diff))}% less this month.`,
        icon: 'trending-down',
      });
    }
  }

  // Budget status
  const overallBudget = budgets.find(
    (b) =>
      b.category === 'overall' && b.month === currentMonth && b.year === currentYear
  );

  if (overallBudget) {
    const budgetUsage = calculatePercentage(currentTotal, overallBudget.limitAmount);
    if (budgetUsage < 80) {
      insights.push({
        id: 'budget_safe',
        type: 'success',
        message: `You are within budget this month! ${100 - budgetUsage}% remaining.`,
        icon: 'checkmark-circle',
      });
    } else if (budgetUsage >= 100) {
      insights.push({
        id: 'budget_exceeded',
        type: 'warning',
        message: `Budget exceeded by ${budgetUsage - 100}%!`,
        icon: 'alert-circle',
      });
    }
  }

  // Category insights
  const categoryBreakdown = calculateCategoryBreakdown(
    expenses,
    currentMonth,
    currentYear
  );

  if (categoryBreakdown.length > 0) {
    const topCategory = categoryBreakdown[0];
    insights.push({
      id: 'top_category',
      type: 'info',
      message: `${topCategory.category} is your highest expense category at ${topCategory.percentage}%.`,
      icon: 'pie-chart',
    });
  }

  // Savings rate
  if (incomeTotal > 0) {
    const savings = incomeTotal - currentTotal;
    const savingsRate = calculatePercentage(savings, incomeTotal);

    if (savingsRate > 20) {
      insights.push({
        id: 'savings_good',
        type: 'success',
        message: `Excellent! You saved ${savingsRate}% of your income this month.`,
        icon: 'wallet',
      });
    } else if (savingsRate < 0) {
      insights.push({
        id: 'savings_negative',
        type: 'warning',
        message: `You spent more than your income this month. Consider reducing expenses.`,
        icon: 'warning',
      });
    }
  }

  return insights;
};

export const calculateAverageDailyExpense = (
  expenses: Expense[],
  month: number,
  year: number
): number => {
  const monthlyExpenses = filterByMonth(expenses, month, year);
  const totalAmount = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const daysInMonth = new Date(year, month, 0).getDate();
  return totalAmount / daysInMonth;
};

export const getHighestSpendingCategory = (
  expenses: Expense[],
  month: number,
  year: number
): { category: ExpenseCategory; amount: number } | null => {
  const breakdown = calculateCategoryBreakdown(expenses, month, year);
  if (breakdown.length === 0) return null;

  return {
    category: breakdown[0].category,
    amount: breakdown[0].amount,
  };
};
