// Firestore Database Service

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Expense, Income, Budget } from '../types';

// ============= EXPENSES =============

export const addExpenseToFirestore = async (
  userId: string, 
  expense: Omit<Expense, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'expenses'), {
      ...expense,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(`Failed to add expense: ${error.message}`);
  }
};

export const getExpensesFromFirestore = async (
  userId: string
): Promise<Expense[]> => {
  try {
    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];
    
    querySnapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data()
      } as Expense);
    });
    
    return expenses;
  } catch (error: any) {
    throw new Error(`Failed to fetch expenses: ${error.message}`);
  }
};

export const updateExpenseInFirestore = async (
  expenseId: string,
  updates: Partial<Expense>
): Promise<void> => {
  try {
    const expenseRef = doc(db, 'expenses', expenseId);
    await updateDoc(expenseRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(`Failed to update expense: ${error.message}`);
  }
};

export const deleteExpenseFromFirestore = async (
  expenseId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'expenses', expenseId));
  } catch (error: any) {
    throw new Error(`Failed to delete expense: ${error.message}`);
  }
};

// ============= INCOME =============

export const addIncomeToFirestore = async (
  userId: string,
  income: Omit<Income, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'income'), {
      ...income,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(`Failed to add income: ${error.message}`);
  }
};

export const getIncomeFromFirestore = async (
  userId: string
): Promise<Income[]> => {
  try {
    const q = query(
      collection(db, 'income'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const incomeList: Income[] = [];
    
    querySnapshot.forEach((doc) => {
      incomeList.push({
        id: doc.id,
        ...doc.data()
      } as Income);
    });
    
    return incomeList;
  } catch (error: any) {
    throw new Error(`Failed to fetch income: ${error.message}`);
  }
};

export const updateIncomeInFirestore = async (
  incomeId: string,
  updates: Partial<Income>
): Promise<void> => {
  try {
    const incomeRef = doc(db, 'income', incomeId);
    await updateDoc(incomeRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(`Failed to update income: ${error.message}`);
  }
};

export const deleteIncomeFromFirestore = async (
  incomeId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'income', incomeId));
  } catch (error: any) {
    throw new Error(`Failed to delete income: ${error.message}`);
  }
};

// ============= BUDGETS =============

export const addBudgetToFirestore = async (
  userId: string,
  budget: Omit<Budget, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'budgets'), {
      ...budget,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(`Failed to add budget: ${error.message}`);
  }
};

export const getBudgetsFromFirestore = async (
  userId: string
): Promise<Budget[]> => {
  try {
    const q = query(
      collection(db, 'budgets'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const budgets: Budget[] = [];
    
    querySnapshot.forEach((doc) => {
      budgets.push({
        id: doc.id,
        ...doc.data()
      } as Budget);
    });
    
    return budgets;
  } catch (error: any) {
    throw new Error(`Failed to fetch budgets: ${error.message}`);
  }
};

export const updateBudgetInFirestore = async (
  budgetId: string,
  updates: Partial<Budget>
): Promise<void> => {
  try {
    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(`Failed to update budget: ${error.message}`);
  }
};

export const deleteBudgetFromFirestore = async (
  budgetId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'budgets', budgetId));
  } catch (error: any) {
    throw new Error(`Failed to delete budget: ${error.message}`);
  }
};

// ============= SYNC STATUS =============

export const syncLocalDataToFirestore = async (
  userId: string,
  expenses: Expense[],
  income: Income[],
  budgets: Budget[]
): Promise<void> => {
  try {
    // Sync expenses
    for (const expense of expenses) {
      const { id, ...expenseData } = expense;
      await addExpenseToFirestore(userId, expenseData);
    }
    
    // Sync income
    for (const inc of income) {
      const { id, ...incomeData } = inc;
      await addIncomeToFirestore(userId, incomeData);
    }
    
    // Sync budgets
    for (const budget of budgets) {
      const { id, ...budgetData } = budget;
      await addBudgetToFirestore(userId, budgetData);
    }
  } catch (error: any) {
    throw new Error(`Failed to sync data: ${error.message}`);
  }
};
