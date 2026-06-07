// Custom hook for managing expenses with Firebase Firestore

import { useState, useEffect, useCallback } from 'react';
import { Expense } from '../types';
import { useAuth } from '../contexts/AuthContext';
import * as storage from '../storage';
import {
  getExpensesFromFirestore,
  addExpenseToFirestore,
  deleteExpenseFromFirestore,
} from '../services/firestoreService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated && user) {
        // Load from Firestore if user is authenticated
        const data = await getExpensesFromFirestore(user.uid);
        setExpenses(data);
      } else {
        // Load from AsyncStorage if not authenticated (demo mode)
        const data = await storage.getExpenses();
        setExpenses(data);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const addExpense = async (expense: Expense) => {
    try {
      if (isAuthenticated && user) {
        // Add to Firestore
        const { id, ...expenseData } = expense;
        const newId = await addExpenseToFirestore(user.uid, expenseData);
        const newExpense = { ...expense, id: newId };
        setExpenses((prev) => [newExpense, ...prev]);
      } else {
        // Add to AsyncStorage (demo mode)
        await storage.addExpense(expense);
        setExpenses((prev) => [expense, ...prev]);
      }
      return true;
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
      return false;
    }
  };

  const removeExpense = async (id: string) => {
    try {
      if (isAuthenticated && user) {
        // Delete from Firestore
        await deleteExpenseFromFirestore(id);
      } else {
        // Delete from AsyncStorage (demo mode)
        await storage.deleteExpense(id);
      }
      
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
