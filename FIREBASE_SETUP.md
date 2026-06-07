# Firebase Setup Guide for PaisaTrack Nepal

## 📋 Quick Setup (10 Minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `PaisaTrack Nepal`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

### Step 2: Register Your App

1. In Firebase Console, click **"Add app"** button
2. Select **iOS** and **Android** (do both)
3. For Android:
   - Package name: `com.paisatrack.nepal`
   - Download `google-services.json`
   - Place it in: `PaisaTrack/android/app/`

4. For iOS (if needed):
   - Bundle ID: `com.paisatrack.nepal`
   - Download `GoogleService-Info.plist`
   - Place it in iOS project

---

### Step 3: Enable Authentication

1. In Firebase Console, go to **"Authentication"**
2. Click **"Get started"**
3. Enable **"Email/Password"** sign-in method
4. (Optional) Enable **"Google"** sign-in

---

### Step 4: Create Firestore Database

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose location: **asia-south1 (Mumbai)** (closest to Nepal)
5. Click **"Enable"**

---

### Step 5: Set Up Security Rules

In Firestore, go to **"Rules"** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Expenses
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
    }
    
    // Income
    match /income/{incomeId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
    }
    
    // Budgets
    match /budgets/{budgetId} {
      allow read, write: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

Click **"Publish"**

---

### Step 6: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"**
3. Click on your web app
4. Copy the `firebaseConfig` object

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "paisatrack-nepal.firebaseapp.com",
  projectId: "paisatrack-nepal",
  storageBucket: "paisatrack-nepal.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

---

### Step 7: Update Firebase Config in App

Open `src/config/firebase.ts` and replace with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🗄️ Database Collections

### Collection: `users`
```
users/
  {userId}/
    - uid: string
    - email: string
    - name: string
    - currency: string (default: "NPR")
    - darkMode: boolean
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Collection: `expenses`
```
expenses/
  {expenseId}/
    - userId: string (indexed)
    - amount: number
    - category: string
    - paymentMethod: string
    - note: string
    - date: timestamp (indexed)
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Collection: `income`
```
income/
  {incomeId}/
    - userId: string (indexed)
    - amount: number
    - source: string
    - note: string
    - date: timestamp (indexed)
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Collection: `budgets`
```
budgets/
  {budgetId}/
    - userId: string (indexed)
    - category: string
    - limitAmount: number
    - currentSpent: number
    - month: number
    - year: number
    - createdAt: timestamp
    - updatedAt: timestamp
```

---

## 🔧 Create Indexes

In Firestore Console, go to **"Indexes"** tab and create:

### Composite Index 1: Expenses by User and Date
- Collection: `expenses`
- Fields:
  - `userId` (Ascending)
  - `date` (Descending)

### Composite Index 2: Income by User and Date
- Collection: `income`
- Fields:
  - `userId` (Ascending)
  - `date` (Descending)

### Composite Index 3: Budgets by User, Month, Year
- Collection: `budgets`
- Fields:
  - `userId` (Ascending)
  - `month` (Ascending)
  - `year` (Ascending)

---

## 📱 App Configuration

### Android Setup

1. Place `google-services.json` in `android/app/`

2. Update `android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

3. Update `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### iOS Setup (if needed)

1. Place `GoogleService-Info.plist` in iOS project
2. Run `pod install` in iOS folder

---

## 🧪 Testing Firebase Connection

Create a test file: `src/utils/testFirebase.ts`

```typescript
import { auth, db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test Firestore
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Hello from PaisaTrack!',
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Firestore connected! Test doc ID:', testDoc.id);
    
    // Test Auth
    console.log('✅ Firebase Auth configured');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};
```

---

## 🔐 Environment Variables (Optional)

For security, store credentials in `.env`:

```bash
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

Install: `npm install react-native-dotenv`

---

## 📊 Usage Limits (Free Tier)

### Firestore
- **Reads**: 50,000 per day
- **Writes**: 20,000 per day
- **Deletes**: 20,000 per day
- **Storage**: 1 GB

### Authentication
- **Email/Password**: Unlimited
- **SMS**: 10/day (paid after)

### Storage
- **Files**: 5 GB
- **Downloads**: 1 GB/day

---

## 💰 Cost Estimation

### Small App (100 users)
- Reads: ~10K/day → FREE
- Writes: ~2K/day → FREE
- Storage: <100MB → FREE
- **Cost**: $0/month

### Medium App (1000 users)
- Reads: ~100K/day → $0.36/day
- Writes: ~20K/day → FREE
- Storage: ~500MB → FREE
- **Cost**: ~$10/month

---

## 🚀 Next Steps

1. ✅ Complete Firebase setup
2. ✅ Update `firebase.ts` with your config
3. ✅ Test connection
4. ✅ Implement auth screens
5. ✅ Migrate from AsyncStorage to Firestore
6. ✅ Test sync functionality
7. ✅ Deploy to production

---

## 📞 Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Pricing](https://firebase.google.com/pricing)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)

---

**Done! Your backend is ready to use.** 🎉
