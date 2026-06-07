import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Income, Budget } from '../types';
import { isFirebaseConfigured } from '../config/firebase';

class FirestoreService {
  // Expenses
  async getExpenses(userId: string): Promise<Expense[]> {
    if (!isFirebaseConfigured) {
      const data = await AsyncStorage.getItem('demo_expenses');
      return data ? JSON.parse(data) : [];
    }
    // TODO: Implement Firestore query
    return [];
  }

  async addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<void> {
    if (!isFirebaseConfigured) {
      const expenses = await this.getExpenses(expense.userId);
      const newExpense: Expense = {
        ...expense,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      expenses.push(newExpense);
      await AsyncStorage.setItem('demo_expenses', JSON.stringify(expenses));
      return;
    }
    // TODO: Implement Firestore add
  }

  async deleteExpense(expenseId: string, userId: string): Promise<void> {
    if (!isFirebaseConfigured) {
      const expenses = await this.getExpenses(userId);
      const filtered = expenses.filter((e) => e.id !== expenseId);
      await AsyncStorage.setItem('demo_expenses', JSON.stringify(filtered));
      return;
    }
    // TODO: Implement Firestore delete
  }

  // Income
  async getIncome(userId: string): Promise<Income[]> {
    if (!isFirebaseConfigured) {
      const data = await AsyncStorage.getItem('demo_income');
      return data ? JSON.parse(data) : [];
    }
    // TODO: Implement Firestore query
    return [];
  }

  async addIncome(income: Omit<Income, 'id' | 'createdAt'>): Promise<void> {
    if (!isFirebaseConfigured) {
      const incomes = await this.getIncome(income.userId);
      const newIncome: Income = {
        ...income,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      incomes.push(newIncome);
      await AsyncStorage.setItem('demo_income', JSON.stringify(incomes));
      return;
    }
    // TODO: Implement Firestore add
  }

  // Budgets
  async getBudgets(userId: string): Promise<Budget[]> {
    if (!isFirebaseConfigured) {
      const data = await AsyncStorage.getItem('demo_budgets');
      return data ? JSON.parse(data) : [];
    }
    // TODO: Implement Firestore query
    return [];
  }

  async setBudget(budget: Omit<Budget, 'id' | 'createdAt'>): Promise<void> {
    if (!isFirebaseConfigured) {
      const budgets = await this.getBudgets(budget.userId);
      const newBudget: Budget = {
        ...budget,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      budgets.push(newBudget);
      await AsyncStorage.setItem('demo_budgets', JSON.stringify(budgets));
      return;
    }
    // TODO: Implement Firestore set
  }
}

export const firestoreService = new FirestoreService();
