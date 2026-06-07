# Backend Implementation Guide - PaisaTrack Nepal

## ✅ What's Been Created

### 1. **Firebase Configuration** (`src/config/firebase.ts`)
- Firebase app initialization
- Auth, Firestore, and Storage setup
- AsyncStorage persistence for offline auth

### 2. **Authentication Service** (`src/services/authService.ts`)
- Register new users
- Login with email/password
- Logout
- Password reset
- User profile management

### 3. **Firestore Service** (`src/services/firestoreService.ts`)
- Add/Get/Update/Delete Expenses
- Add/Get/Update/Delete Income
- Add/Get/Update/Delete Budgets
- Sync local data to cloud

### 4. **Login Screen** (`src/screens/LoginScreen.tsx`)
- Beautiful login/register UI
- Form validation
- Loading states
- Error handling

---

## 🚀 Quick Implementation (30 Minutes)

### Step 1: Complete Firebase Setup

Follow `FIREBASE_SETUP.md`:
1. Create Firebase project
2. Enable Authentication
3. Create Firestore database
4. Set security rules
5. Get config and update `src/config/firebase.ts`

### Step 2: Update App.tsx to Check Auth

```typescript
// App.tsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/config/firebase';
import { LoginScreen } from './src/screens/LoginScreen';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            {user ? <AppNavigator /> : <LoginScreen />}
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

### Step 3: Update Hooks to Use Firestore

Update `src/hooks/useExpenses.ts`:

```typescript
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  getExpensesFromFirestore,
  addExpenseToFirestore,
  deleteExpenseFromFirestore
} from '../services/firestoreService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      const data = await getExpensesFromFirestore(userId);
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Expense) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return false;

    try {
      const { id, ...expenseData } = expense;
      const newId = await addExpenseToFirestore(userId, expenseData);
      setExpenses([...expenses, { ...expense, id: newId }]);
      return true;
    } catch (error) {
      console.error('Error adding expense:', error);
      return false;
    }
  };

  const removeExpense = async (id: string) => {
    try {
      await deleteExpenseFromFirestore(id);
      setExpenses(expenses.filter(e => e.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      return false;
    }
  };

  return {
    expenses,
    loading,
    addExpense,
    removeExpense,
    refreshExpenses: loadExpenses
  };
};
```

Do the same for `useIncome.ts` and `useBudgets.ts`.

---

## 📊 Database Structure

### Firestore Collections

```
paisatrack-nepal/
├── users/
│   └── {userId}
│       ├── uid
│       ├── email
│       ├── name
│       ├── currency
│       ├── darkMode
│       └── timestamps
│
├── expenses/
│   └── {expenseId}
│       ├── userId (indexed)
│       ├── amount
│       ├── category
│       ├── paymentMethod
│       ├── note
│       ├── date (indexed)
│       └── timestamps
│
├── income/
│   └── {incomeId}
│       ├── userId (indexed)
│       ├── amount
│       ├── source
│       ├── note
│       ├── date (indexed)
│       └── timestamps
│
└── budgets/
    └── {budgetId}
        ├── userId (indexed)
        ├── category
        ├── limitAmount
        ├── currentSpent
        ├── month
        ├── year
        └── timestamps
```

---

## 🔄 Offline/Online Sync Strategy

### Phase 1: Online Only (Current)
- All operations go directly to Firestore
- Requires internet connection
- Simple implementation

### Phase 2: Offline First (Future)
```typescript
// Example offline sync
export const addExpenseWithSync = async (expense: Expense) => {
  // 1. Save to AsyncStorage immediately
  await storage.addExpense(expense);
  
  // 2. Try to sync to Firestore
  try {
    if (isOnline) {
      await addExpenseToFirestore(userId, expense);
      // Mark as synced
    } else {
      // Add to sync queue
      await addToSyncQueue('expenses', 'create', expense);
    }
  } catch (error) {
    // Add to sync queue for retry
    await addToSyncQueue('expenses', 'create', expense);
  }
};

// Background sync process
export const syncPendingChanges = async () => {
  const queue = await getSyncQueue();
  
  for (const item of queue) {
    try {
      await syncToFirestore(item);
      await removeFromSyncQueue(item.id);
    } catch (error) {
      console.error('Sync failed:', error);
      // Retry later
    }
  }
};
```

---

## 🔐 Security Rules Explained

```javascript
// Users can only access their own data
match /expenses/{expenseId} {
  // User must be authenticated
  allow read: if request.auth != null 
    // Can only read their own expenses
    && resource.data.userId == request.auth.uid;
  
  allow create: if request.auth != null 
    // Must set userId to their own ID
    && request.resource.data.userId == request.auth.uid;
  
  allow update, delete: if request.auth != null 
    // Can only modify their own expenses
    && resource.data.userId == request.auth.uid;
}
```

---

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout
- [ ] Password reset email
- [ ] Auth state persistence

### Firestore Tests
- [ ] Add expense (online)
- [ ] Load expenses (online)
- [ ] Update expense
- [ ] Delete expense
- [ ] Add income
- [ ] Add budget
- [ ] Security rules work (try accessing other user's data)

### Offline Tests
- [ ] Add expense (offline) - should fail gracefully
- [ ] Load cached data (offline)
- [ ] Sync when back online

---

## 🚀 Deployment Steps

### Step 1: Update Firebase Config
Replace placeholder config in `src/config/firebase.ts`

### Step 2: Test Thoroughly
- Test all CRUD operations
- Test authentication flow
- Test on real device

### Step 3: Update Security Rules
Change from test mode to production mode:

```javascript
// Test mode (temporary)
allow read, write: if true;

// Production mode
allow read, write: if request.auth != null 
  && resource.data.userId == request.auth.uid;
```

### Step 4: Set Up Monitoring
- Enable Firebase Analytics
- Set up error tracking
- Monitor usage quotas

### Step 5: Build and Deploy
```bash
# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

---

## 💡 Best Practices

### 1. **Error Handling**
```typescript
try {
  await addExpenseToFirestore(userId, expense);
} catch (error) {
  if (error.code === 'permission-denied') {
    Alert.alert('Error', 'You don\'t have permission');
  } else if (error.code === 'unavailable') {
    Alert.alert('Offline', 'Please check your connection');
  } else {
    Alert.alert('Error', 'Something went wrong');
  }
}
```

### 2. **Loading States**
Always show loading indicators for async operations

### 3. **Optimistic Updates**
Update UI immediately, sync in background:
```typescript
// Update UI first
setExpenses([...expenses, newExpense]);

// Sync to Firestore
addExpenseToFirestore(userId, newExpense)
  .catch(() => {
    // Revert on error
    setExpenses(expenses);
    Alert.alert('Failed to sync');
  });
```

### 4. **Batch Operations**
```typescript
import { writeBatch } from 'firebase/firestore';

const batch = writeBatch(db);
expenses.forEach(expense => {
  const ref = doc(collection(db, 'expenses'));
  batch.set(ref, expense);
});
await batch.commit();
```

---

## 📊 Performance Optimization

### 1. **Pagination**
```typescript
const q = query(
  collection(db, 'expenses'),
  where('userId', '==', userId),
  orderBy('date', 'desc'),
  limit(20) // Load 20 at a time
);
```

### 2. **Caching**
Firestore has built-in caching:
```typescript
const q = query(
  collection(db, 'expenses'),
  where('userId', '==', userId)
);

// First call: from cache if available
const snapshot = await getDocs(q);
```

### 3. **Indexes**
Create composite indexes for complex queries in Firebase Console

---

## 💰 Cost Management

### Free Tier Limits
- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1GB storage

### Optimization Tips
1. **Cache aggressively**
2. **Batch writes when possible**
3. **Use pagination**
4. **Avoid reading entire collections**
5. **Clean up old data periodically**

---

## 🎯 Next Steps

1. [ ] Complete Firebase setup (10 min)
2. [ ] Update firebase config (2 min)
3. [ ] Test authentication (5 min)
4. [ ] Update hooks to use Firestore (15 min)
5. [ ] Test CRUD operations (10 min)
6. [ ] Deploy security rules (2 min)
7. [ ] Test on device (5 min)

**Total time: ~50 minutes** ⏱️

---

## 📞 Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [Security Rules Reference](https://firebase.google.com/docs/firestore/security/rules-structure)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**Your backend is ready! Just follow the steps above to activate it.** 🚀
