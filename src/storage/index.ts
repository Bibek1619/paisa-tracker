// Local storage service using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Income, Budget, UserSettings } from '../types';
import { STORAGE_KEYS } from '../constants/data';

// Expense Storage
export const saveExpenses = async (expenses: Expense[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

export const addExpense = async (expense: Expense): Promise<void> => {
  try {
    const expenses = await getExpenses();
    expenses.push(expense);
    await saveExpenses(expenses);
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const filtered = expenses.filter((e) => e.id !== id);
    await saveExpenses(filtered);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// Income Storage
export const saveIncome = async (income: Income[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.INCOME, JSON.stringify(income));
  } catch (error) {
    console.error('Error saving income:', error);
    throw error;
  }
};

export const getIncome = async (): Promise<Income[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.INCOME);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading income:', error);
    return [];
  }
};

export const addIncome = async (income: Income): Promise<void> => {
  try {
    const incomeList = await getIncome();
    incomeList.push(income);
    await saveIncome(incomeList);
  } catch (error) {
    console.error('Error adding income:', error);
    throw error;
  }
};

export const deleteIncome = async (id: string): Promise<void> => {
  try {
    const incomeList = await getIncome();
    const filtered = incomeList.filter((i) => i.id !== id);
    await saveIncome(filtered);
  } catch (error) {
    console.error('Error deleting income:', error);
    throw error;
  }
};

// Budget Storage
export const saveBudgets = async (budgets: Budget[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budgets:', error);
    throw error;
  }
};

export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading budgets:', error);
    return [];
  }
};

export const addOrUpdateBudget = async (budget: Budget): Promise<void> => {
  try {
    const budgets = await getBudgets();
    const existingIndex = budgets.findIndex(
      (b) =>
        b.category === budget.category &&
        b.month === budget.month &&
        b.year === budget.year
    );

    if (existingIndex >= 0) {
      budgets[existingIndex] = budget;
    } else {
      budgets.push(budget);
    }

    await saveBudgets(budgets);
  } catch (error) {
    console.error('Error adding/updating budget:', error);
    throw error;
  }
};

export const deleteBudget = async (id: string): Promise<void> => {
  try {
    const budgets = await getBudgets();
    const filtered = budgets.filter((b) => b.id !== id);
    await saveBudgets(filtered);
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw error;
  }
};

// Settings Storage
export const saveSettings = async (settings: UserSettings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

export const getSettings = async (): Promise<UserSettings> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data
      ? JSON.parse(data)
      : { name: 'User', currency: 'NPR', darkMode: false };
  } catch (error) {
    console.error('Error loading settings:', error);
    return { name: 'User', currency: 'NPR', darkMode: false };
  }
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.EXPENSES,
      STORAGE_KEYS.INCOME,
      STORAGE_KEYS.BUDGETS,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

// Export data as JSON string
export const exportData = async (): Promise<string> => {
  try {
    const [expenses, income, budgets, settings] = await Promise.all([
      getExpenses(),
      getIncome(),
      getBudgets(),
      getSettings(),
    ]);

    return JSON.stringify(
      {
        expenses,
        income,
        budgets,
        settings,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    );
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};
