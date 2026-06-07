import { Expense, Income, ExpenseCategory } from '../types';

class AnalyticsService {
  calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateTotalIncome(income: Income[]): number {
    return income.reduce((sum, inc) => sum + inc.amount, 0);
  }

  getExpensesByCategory(expenses: Expense[]): Record<ExpenseCategory, number> {
    const result = {} as Record<ExpenseCategory, number>;
    expenses.forEach((expense) => {
      result[expense.category] = (result[expense.category] || 0) + expense.amount;
    });
    return result;
  }

  getMonthlyExpenses(expenses: Expense[], month: string): Expense[] {
    return expenses.filter((expense) => {
      const expenseMonth = expense.date.toISOString().slice(0, 7);
      return expenseMonth === month;
    });
  }

  getTodayExpenses(expenses: Expense[]): Expense[] {
    const today = new Date().toDateString();
    return expenses.filter(
      (expense) => new Date(expense.date).toDateString() === today
    );
  }
}

export const analyticsService = new AnalyticsService();
