// Custom hook for managing budgets with Firebase Firestore

import { useState, useEffect, useCallback } from 'react';
import { Budget } from '../types';
import { useAuth } from '../contexts/AuthContext';
import * as storage from '../storage';
import {
  getBudgetsFromFirestore,
  addBudgetToFirestore,
  updateBudgetInFirestore,
  deleteBudgetFromFirestore,
} from '../services/firestoreService';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const loadBudgets = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated && user) {
        // Load from Firestore if user is authenticated
        const data = await getBudgetsFromFirestore(user.uid);
        setBudgets(data);
      } else {
        // Load from AsyncStorage if not authenticated (demo mode)
        const data = await storage.getBudgets();
        setBudgets(data);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load budgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  const addOrUpdateBudget = async (budget: Budget) => {
    try {
      if (isAuthenticated && user) {
        // Check if budget already exists
        const existingIndex = budgets.findIndex(
          (b) =>
            b.category === budget.category &&
            b.month === budget.month &&
            b.year === budget.year
        );

        if (existingIndex >= 0 && budgets[existingIndex].id) {
          // Update existing budget in Firestore
          const { id, ...budgetData } = budget;
          await updateBudgetInFirestore(budgets[existingIndex].id, budgetData);
          
          setBudgets((prev) => {
            const updated = [...prev];
            updated[existingIndex] = { ...budget, id: budgets[existingIndex].id };
            return updated;
          });
        } else {
          // Add new budget to Firestore
          const { id, ...budgetData } = budget;
          const newId = await addBudgetToFirestore(user.uid, budgetData);
          const newBudget = { ...budget, id: newId };
          setBudgets((prev) => [...prev, newBudget]);
        }
      } else {
        // AsyncStorage (demo mode)
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
      if (isAuthenticated && user) {
        // Delete from Firestore
        await deleteBudgetFromFirestore(id);
      } else {
        // Delete from AsyncStorage (demo mode)
        await storage.deleteBudget(id);
      }
      
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
