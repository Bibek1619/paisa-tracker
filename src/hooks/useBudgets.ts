// Custom hook for managing budgets

import { useState, useEffect, useCallback } from 'react';
import { Budget } from '../types';
import * as storage from '../storage';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getBudgets();
      setBudgets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load budgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  const addOrUpdateBudget = async (budget: Budget) => {
    try {
      await storage.addOrUpdateBudget(budget);
      const existingIndex = budgets.findIndex(
        (b) =>
          b.category === budget.category &&
          b.month === budget.month &&
          b.year === budget.year
      );

      if (existingIndex >= 0) {
        setBudgets((prev) => {
          const updated = [...prev];
          updated[existingIndex] = budget;
          return updated;
        });
      } else {
        setBudgets((prev) => [...prev, budget]);
      }
      return true;
    } catch (err) {
      setError('Failed to save budget');
      console.error(err);
      return false;
    }
  };

  const removeBudget = async (id: string) => {
    try {
      await storage.deleteBudget(id);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete budget');
      console.error(err);
      return false;
    }
  };

  const refreshBudgets = () => {
    loadBudgets();
  };

  return {
    budgets,
    loading,
    error,
    addOrUpdateBudget,
    removeBudget,
    refreshBudgets,
  };
};
