# PaisaTrack Nepal - Backend & Database Plan

## 🏗️ Architecture Overview

### Technology Stack Recommendation

#### **Option 1: Firebase (Recommended for MVP)**
- **Database**: Cloud Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage (for receipts)
- **Hosting**: Firebase Hosting
- **Functions**: Cloud Functions
- **Cost**: Free tier generous, pay-as-you-go

#### **Option 2: Node.js + MongoDB**
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + Passport.js
- **Storage**: AWS S3 or Cloudinary
- **Hosting**: Heroku/Railway/DigitalOcean
- **Cost**: ~$15-30/month

#### **Option 3: Supabase (Modern Alternative)**
- **Database**: PostgreSQL
- **Authentication**: Built-in Auth
- **Storage**: Built-in Storage
- **API**: Auto-generated REST/GraphQL
- **Cost**: Free tier available

---

## 📊 Database Schema

### **1. Users Collection/Table**

```typescript
interface User {
  id: string;                    // Primary Key
  email: string;                 // Unique, required
  password: string;              // Hashed
  name: string;
  phone?: string;
  avatar?: string;               // URL to profile picture
  currency: string;              // Default: 'NPR'
  dateFormat: string;            // 'DD/MM/YYYY' or 'MM/DD/YYYY'
  darkMode: boolean;             // Theme preference
  createdAt: timestamp;
  updatedAt: timestamp;
  lastLoginAt?: timestamp;
  isActive: boolean;             // Account status
  emailVerified: boolean;
  subscription?: {
    plan: 'free' | 'premium';
    startDate: timestamp;
    endDate?: timestamp;
  };
}
```

**Indexes:**
- `email` (unique)
- `createdAt`

---

### **2. Expenses Collection/Table**

```typescript
interface Expense {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  amount: number;                // Decimal(10,2)
  category: ExpenseCategory;     // Enum
  paymentMethod: PaymentMethod;  // Enum
  note: string;                  // Text, max 500 chars
  date: timestamp;               // Transaction date
  createdAt: timestamp;
  updatedAt: timestamp;
  receiptUrl?: string;           // URL to receipt image
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  tags?: string[];               // Optional tags
  isRecurring: boolean;          // For recurring expenses
  recurringId?: string;          // Link to RecurringTransactions
  syncStatus: 'synced' | 'pending' | 'conflict';
}
```

**Indexes:**
- `userId`
- `userId + date` (composite)
- `userId + category`
- `createdAt`

**Enums:**
```typescript
enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  RENT = 'Rent',
  SHOPPING = 'Shopping',
  EDUCATION = 'Education',
  HEALTH = 'Health',
  ENTERTAINMENT = 'Entertainment',
  MOBILE_RECHARGE = 'Mobile Recharge',
  INTERNET = 'Internet',
  OTHERS = 'Others'
}

enum PaymentMethod {
  CASH = 'Cash',
  ESEWA = 'eSewa',
  KHALTI = 'Khalti',
  BANK = 'Bank',
  FONEPAY = 'Fonepay'
}
```

---

### **3. Income Collection/Table**

```typescript
interface Income {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  amount: number;                // Decimal(10,2)
  source: IncomeSource;          // Enum
  note: string;
  date: timestamp;
  createdAt: timestamp;
  updatedAt: timestamp;
  isRecurring: boolean;
  recurringId?: string;
  syncStatus: 'synced' | 'pending' | 'conflict';
}
```

**Indexes:**
- `userId`
- `userId + date` (composite)
- `createdAt`

**Enums:**
```typescript
enum IncomeSource {
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  BUSINESS = 'Business',
  GIFT = 'Gift',
  OTHER = 'Other'
}
```

---

### **4. Budgets Collection/Table**

```typescript
interface Budget {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  category: ExpenseCategory | 'overall';
  limitAmount: number;           // Decimal(10,2)
  currentSpent: number;          // Calculated field
  month: number;                 // 1-12
  year: number;                  // 2024, 2025, etc.
  alertThreshold: number;        // Percentage (80, 90, 100)
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Indexes:**
- `userId`
- `userId + month + year` (composite)
- `userId + category + month + year` (unique composite)

---

### **5. RecurringTransactions Collection/Table**

```typescript
interface RecurringTransaction {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  type: 'expense' | 'income';
  amount: number;
  category: string;              // ExpenseCategory or IncomeSource
  paymentMethod?: PaymentMethod;
  note: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: timestamp;
  endDate?: timestamp;           // null = ongoing
  nextOccurrence: timestamp;
  isActive: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

**Indexes:**
- `userId`
- `userId + isActive`
- `nextOccurrence`

---

### **6. Goals/Savings Collection/Table**

```typescript
interface SavingsGoal {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  title: string;                 // "New Laptop", "Vacation", etc.
  targetAmount: number;
  currentAmount: number;
  deadline?: timestamp;
  category: string;              // Travel, Electronics, etc.
  iconUrl?: string;
  createdAt: timestamp;
  updatedAt: timestamp;
  completedAt?: timestamp;
  isCompleted: boolean;
}
```

**Indexes:**
- `userId`
- `userId + isCompleted`

---

### **7. Notifications Collection/Table**

```typescript
interface Notification {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  type: 'budget_alert' | 'goal_achieved' | 'bill_reminder' | 'insight';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;            // Deep link
  createdAt: timestamp;
  expiresAt?: timestamp;
}
```

**Indexes:**
- `userId + isRead`
- `createdAt`

---

### **8. Categories Collection/Table** (Optional - for custom categories)

```typescript
interface CustomCategory {
  id: string;                    // Primary Key
  userId: string;                // Foreign Key -> Users.id
  name: string;
  type: 'expense' | 'income';
  icon: string;                  // Icon name or emoji
  color: string;                 // Hex color
  createdAt: timestamp;
}
```

---

### **9. SharedBudgets Collection/Table** (For family sharing)

```typescript
interface SharedBudget {
  id: string;                    // Primary Key
  ownerId: string;               // Foreign Key -> Users.id
  name: string;                  // "Family Budget"
  members: string[];             // Array of user IDs
  permissions: {
    [userId: string]: 'owner' | 'editor' | 'viewer'
  };
  budgetId: string;              // Foreign Key -> Budgets.id
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

---

## 🔐 API Endpoints

### **Authentication**

```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - Login user
POST   /api/auth/logout             - Logout user
POST   /api/auth/refresh-token      - Refresh JWT token
POST   /api/auth/forgot-password    - Send reset email
POST   /api/auth/reset-password     - Reset password
GET    /api/auth/verify-email/:token - Verify email
```

### **User Management**

```
GET    /api/users/profile           - Get user profile
PUT    /api/users/profile           - Update profile
PUT    /api/users/settings          - Update settings
PUT    /api/users/avatar            - Upload avatar
DELETE /api/users/account           - Delete account
```

### **Expenses**

```
GET    /api/expenses                - List expenses (paginated)
GET    /api/expenses/:id            - Get single expense
POST   /api/expenses                - Create expense
PUT    /api/expenses/:id            - Update expense
DELETE /api/expenses/:id            - Delete expense
GET    /api/expenses/search         - Search expenses
GET    /api/expenses/export         - Export as CSV/PDF
POST   /api/expenses/bulk           - Bulk create
```

### **Income**

```
GET    /api/income                  - List income
GET    /api/income/:id              - Get single income
POST   /api/income                  - Create income
PUT    /api/income/:id              - Update income
DELETE /api/income/:id              - Delete income
```

### **Budgets**

```
GET    /api/budgets                 - List budgets
GET    /api/budgets/:id             - Get single budget
POST   /api/budgets                 - Create budget
PUT    /api/budgets/:id             - Update budget
DELETE /api/budgets/:id             - Delete budget
GET    /api/budgets/status/:month   - Get budget status
```

### **Analytics**

```
GET    /api/analytics/summary       - Monthly/yearly summary
GET    /api/analytics/trends        - Spending trends
GET    /api/analytics/category      - Category breakdown
GET    /api/analytics/insights      - AI insights
GET    /api/analytics/comparison    - Month-over-month
```

### **Recurring Transactions**

```
GET    /api/recurring               - List recurring
POST   /api/recurring               - Create recurring
PUT    /api/recurring/:id           - Update recurring
DELETE /api/recurring/:id           - Delete recurring
POST   /api/recurring/:id/pause     - Pause recurring
```

### **Goals**

```
GET    /api/goals                   - List goals
POST   /api/goals                   - Create goal
PUT    /api/goals/:id               - Update goal
DELETE /api/goals/:id               - Delete goal
POST   /api/goals/:id/contribute    - Add contribution
```

---

## 🔒 Security Considerations

### **Authentication**
```typescript
// JWT Token Structure
interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  iat: number;      // Issued at
  exp: number;      // Expiration
}
```

### **Password Requirements**
- Minimum 8 characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 number
- At least 1 special character
- Hashed with bcrypt (salt rounds: 12)

### **Rate Limiting**
```typescript
const rateLimits = {
  auth: '5 requests per 15 minutes',
  api: '100 requests per 15 minutes',
  upload: '10 requests per hour'
};
```

### **Data Validation**
- Input sanitization (prevent XSS)
- SQL/NoSQL injection prevention
- File upload validation (size, type)
- Amount validation (max: 1,000,000,000)

---

## 🚀 Firebase Implementation (Recommended)

### **Firestore Collections Structure**

```
paisatrack/
├── users/
│   └── {userId}/
│       ├── profile (document)
│       └── settings (document)
├── expenses/
│   └── {expenseId} (document)
├── income/
│   └── {incomeId} (document)
├── budgets/
│   └── {budgetId} (document)
├── recurring/
│   └── {recurringId} (document)
└── notifications/
    └── {notificationId} (document)
```

### **Security Rules Example**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own data
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
    
    match /income/{incomeId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
    
    match /budgets/{budgetId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

### **Cloud Functions Examples**

```typescript
// Auto-calculate budget spent
export const calculateBudgetSpent = functions.firestore
  .document('expenses/{expenseId}')
  .onCreate(async (snap, context) => {
    const expense = snap.data();
    const budgetRef = db.collection('budgets')
      .where('userId', '==', expense.userId)
      .where('category', '==', expense.category)
      .where('month', '==', expense.month)
      .where('year', '==', expense.year);
    
    const budgets = await budgetRef.get();
    budgets.forEach(doc => {
      doc.ref.update({
        currentSpent: admin.firestore.FieldValue.increment(expense.amount)
      });
    });
  });

// Send budget alert
export const sendBudgetAlert = functions.firestore
  .document('budgets/{budgetId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const percentage = (newData.currentSpent / newData.limitAmount) * 100;
    
    if (percentage >= 90) {
      await sendNotification(newData.userId, {
        type: 'budget_alert',
        title: 'Budget Alert!',
        message: `${newData.category} budget is ${percentage}% used!`
      });
    }
  });
```

---

## 💰 Cost Estimation

### **Firebase (Monthly)**
- **Free Tier**: 50K reads, 20K writes, 20K deletes, 1GB storage
- **Blaze Plan** (Pay-as-you-go):
  - ~100 users: $0-5/month
  - ~1,000 users: $10-25/month
  - ~10,000 users: $50-100/month

### **Node.js + MongoDB (Monthly)**
- **Hosting** (Railway/Render): $5-10
- **Database** (MongoDB Atlas): $0-15
- **Storage** (Cloudinary): $0-10
- **Total**: ~$15-35/month

### **Supabase (Monthly)**
- **Free Tier**: 500MB database, 1GB storage
- **Pro Plan**: $25/month (8GB database, 100GB storage)

---

## 📈 Scalability Plan

### **Phase 1: MVP (0-1K users)**
- Firebase Firestore
- Client-side logic
- AsyncStorage backup
- No server needed

### **Phase 2: Growth (1K-10K users)**
- Add Cloud Functions
- Implement caching (Redis)
- Add analytics (Google Analytics)
- Optimize queries

### **Phase 3: Scale (10K+ users)**
- Migrate to Node.js backend
- Add load balancer
- Implement CDN
- Database sharding
- Microservices architecture

---

## 🔄 Sync Strategy

### **Offline-First Approach**

```typescript
interface SyncQueue {
  id: string;
  userId: string;
  action: 'create' | 'update' | 'delete';
  collection: 'expenses' | 'income' | 'budgets';
  data: any;
  timestamp: number;
  synced: boolean;
  attempts: number;
}
```

### **Conflict Resolution**
- **Last Write Wins**: Use timestamp
- **User Prompt**: Ask user to choose
- **Merge Strategy**: Combine changes

---

## 🎯 Recommended: Firebase Setup

### **Quick Start Guide**

1. **Create Firebase Project**
2. **Enable Authentication** (Email/Password, Google)
3. **Create Firestore Database**
4. **Set Security Rules**
5. **Install Firebase SDK in React Native**

```bash
npm install firebase @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

6. **Initialize Firebase**

```typescript
// src/config/firebase.ts
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "paisatrack-nepal.firebaseapp.com",
  projectId: "paisatrack-nepal",
  storageBucket: "paisatrack-nepal.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth, firestore };
export default firebase;
```

---

## ✅ Implementation Checklist

- [ ] Set up Firebase project
- [ ] Configure authentication
- [ ] Design Firestore collections
- [ ] Implement security rules
- [ ] Create Cloud Functions
- [ ] Add offline sync
- [ ] Implement conflict resolution
- [ ] Add analytics tracking
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Test data migration
- [ ] Deploy to production

---

**Recommendation**: Start with **Firebase** for fastest time-to-market, then migrate to Node.js backend if scaling requires it.
