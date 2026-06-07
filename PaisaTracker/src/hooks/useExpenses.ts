import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    if (!user) return;
    setLoading(true);
    const data = await firestoreService.getExpenses(user.id);
    setExpenses(data);
    setLoading(false);
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    await firestoreService.addExpense({ ...expense, userId: user.id });
    await loadExpenses();
  };

  const deleteExpense = async (expenseId: string) => {
    if (!user) return;
    await firestoreService.deleteExpense(expenseId, user.id);
    await loadExpenses();
  };

  return { expenses, loading, addExpense, deleteExpense, refresh: loadExpenses };
};

export default useExpenses;
