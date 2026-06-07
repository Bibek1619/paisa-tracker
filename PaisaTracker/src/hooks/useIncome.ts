import { useState, useEffect } from 'react';
import { Income } from '../types';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

const useIncome = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadIncome();
    }
  }, [user]);

  const loadIncome = async () => {
    if (!user) return;
    setLoading(true);
    const data = await firestoreService.getIncome(user.id);
    setIncome(data);
    setLoading(false);
  };

  const addIncome = async (newIncome: Omit<Income, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;
    await firestoreService.addIncome({ ...newIncome, userId: user.id });
    await loadIncome();
  };

  return { income, loading, addIncome, refresh: loadIncome };
};

export default useIncome;
