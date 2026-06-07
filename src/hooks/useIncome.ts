// Custom hook for managing income with Firebase Firestore

import { useState, useEffect, useCallback } from 'react';
import { Income } from '../types';
import { useAuth } from '../contexts/AuthContext';
import * as storage from '../storage';
import {
  getIncomeFromFirestore,
  addIncomeToFirestore,
  deleteIncomeFromFirestore,
} from '../services/firestoreService';

export const useIncome = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const loadIncome = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isAuthenticated && user) {
        // Load from Firestore if user is authenticated
        const data = await getIncomeFromFirestore(user.uid);
        setIncome(data);
      } else {
        // Load from AsyncStorage if not authenticated (demo mode)
        const data = await storage.getIncome();
        setIncome(data);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load income');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadIncome();
  }, [loadIncome]);

  const addIncome = async (incomeItem: Income) => {
    try {
      if (isAuthenticated && user) {
        // Add to Firestore
        const { id, ...incomeData } = incomeItem;
        const newId = await addIncomeToFirestore(user.uid, incomeData);
        const newIncome = { ...incomeItem, id: newId };
        setIncome((prev) => [newIncome, ...prev]);
      } else {
        // Add to AsyncStorage (demo mode)
        await storage.addIncome(incomeItem);
        setIncome((prev) => [incomeItem, ...prev]);
      }
      return true;
    } catch (err) {
      setError('Failed to add income');
      console.error(err);
      return false;
    }
  };

  const removeIncome = async (id: string) => {
    try {
      if (isAuthenticated && user) {
        // Delete from Firestore
        await deleteIncomeFromFirestore(id);
      } else {
        // Delete from AsyncStorage (demo mode)
        await storage.deleteIncome(id);
      }
      
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
