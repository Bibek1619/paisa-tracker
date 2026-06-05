// Custom hook for managing income

import { useState, useEffect, useCallback } from 'react';
import { Income } from '../types';
import * as storage from '../storage';

export const useIncome = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIncome = useCallback(async () => {
    try {
      setLoading(true);
      const data = await storage.getIncome();
      setIncome(data);
      setError(null);
    } catch (err) {
      setError('Failed to load income');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncome();
  }, [loadIncome]);

  const addIncome = async (incomeItem: Income) => {
    try {
      await storage.addIncome(incomeItem);
      setIncome((prev) => [...prev, incomeItem]);
      return true;
    } catch (err) {
      setError('Failed to add income');
      console.error(err);
      return false;
    }
  };

  const removeIncome = async (id: string) => {
    try {
      await storage.deleteIncome(id);
      setIncome((prev) => prev.filter((i) => i.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete income');
      console.error(err);
      return false;
    }
  };

  const refreshIncome = () => {
    loadIncome();
  };

  return {
    income,
    loading,
    error,
    addIncome,
    removeIncome,
    refreshIncome,
  };
};
