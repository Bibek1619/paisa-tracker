// Custom hook for managing expenses

import { useState, useEffect, useCallback } from 'react';
import { Expense } from '../types';
import * as storage from '../storage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const addExpense = async (expense: Expense) => {
    try {
      await storage.addExpense(expense);
      setExpenses((prev) => [...prev, expense]);
      return true;
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
      return false;
    }
  };

  const removeExpense = async (id: string) => {
    try {
      await storage.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
      return false;
    }
  };

  const refreshExpenses = () => {
    loadExpenses();
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    removeExpense,
    refreshExpenses,
  };
};
