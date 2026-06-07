import { useState, useEffect } from 'react';
import { Budget } from '../types';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadBudgets();
    }
  }, [user]);

  const loadBudgets = async () => {
    if (!user) return;
    setLoading(true);
    const data = await firestoreService.getBudgets(user.id);
    setBudgets(data);
    setLoading(false);
  };

  const setBudget = async (budget: Omit<Budget, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    await firestoreService.setBudget({ ...budget, userId: user.id });
    await loadBudgets();
  };

  return { budgets, loading, setBudget, refresh: loadBudgets };
};

export default useBudgets;
