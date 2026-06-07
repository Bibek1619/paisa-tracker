# 📁 Project Structure - Expense Tracker

## 🎯 Overview

This is a complete expense tracking application with:
- **PaisaTracker** - React Native mobile frontend
- **backend** - Placeholder for future backend API
- **docs** - Documentation folder

---

## 📂 Root Structure

```
expence-tracker/
├── PaisaTracker/          # 💰 React Native Mobile App (FRONTEND)
├── backend/               # 🔧 Future backend API (placeholder)
├── docs/                  # 📚 Documentation
├── .github/               # GitHub Actions workflows
├── README.md              # Main project documentation
└── LICENSE                # MIT License
```

---

## 💰 PaisaTracker (Frontend)

Complete React Native app with Expo

```
PaisaTracker/
├── src/
│   ├── screens/           # 📄 6 App Screens
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   ├── BudgetScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── components/        # 🧩 Reusable Components
│   │   ├── cards/         # Card components
│   │   │   └── ExpenseCard.tsx
│   │   ├── charts/        # Chart components
│   │   │   └── PieChart.tsx
│   │   ├── common/        # Common UI components
│   │   │   └── Button.tsx
│   │   └── forms/         # Form components
│   │       └── ExpenseForm.tsx
│   │
│   ├── navigation/        # 🧭 Navigation Setup
│   │   └── AppNavigator.tsx    # Tab + Stack navigation
│   │
│   ├── contexts/          # 🔄 React Contexts
│   │   ├── AuthContext.tsx     # User authentication
│   │   └── ThemeContext.tsx    # Theme management
│   │
│   ├── services/          # 🔌 Backend Services
│   │   ├── authService.ts      # Authentication logic
│   │   ├── firestoreService.ts # Database operations
│   │   └── analyticsService.ts # Analytics calculations
│   │
│   ├── hooks/             # 🪝 Custom React Hooks
│   │   ├── useExpenses.ts
│   │   ├── useIncome.ts
│   │   ├── useBudgets.ts
│   │   └── useThemedColors.ts
│   │
│   ├── types/             # 📝 TypeScript Types
│   │   └── index.ts       # All type definitions
│   │
│   ├── constants/         # 📊 Constants & Data
│   │   ├── theme.ts       # Colors, spacing, fonts
│   │   └── data.ts        # Categories, payment methods
│   │
│   ├── config/            # ⚙️ Configuration
│   │   └── firebase.ts    # Firebase config
│   │
│   ├── storage/           # 💾 Local Storage
│   │   └── index.ts       # AsyncStorage wrapper
│   │
│   └── utils/             # 🛠️ Utility Functions
│       ├── helpers.ts     # Helper functions
│       └── seedData.ts    # Demo data
│
├── App.tsx                # 🎯 Main App Entry Point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── .gitignore             # Git ignore rules
├── README.md              # Frontend documentation
└── START_HERE.md          # Quick start guide
```

---

## 🔧 Backend (Future)

Placeholder for backend API when needed

```
backend/
├── README.md              # Backend info
└── .gitignore             # Backend gitignore
```

**Current:** Using Firebase for backend
**Future:** Node.js + Express + MongoDB/PostgreSQL

---

## 📚 Features Breakdown

### ✅ Implemented Features

| Feature | Files | Description |
|---------|-------|-------------|
| **Authentication** | `AuthContext.tsx`, `authService.ts`, `LoginScreen.tsx` | User login/register (demo mode) |
| **Dashboard** | `DashboardScreen.tsx` | Financial overview |
| **Transactions** | `TransactionsScreen.tsx`, `ExpenseCard.tsx` | Expense/income tracking |
| **Reports** | `ReportsScreen.tsx`, `PieChart.tsx` | Analytics & charts |
| **Budget** | `BudgetScreen.tsx`, `useBudgets.ts` | Budget management |
| **Profile** | `ProfileScreen.tsx` | User settings |
| **Navigation** | `AppNavigator.tsx` | Tab + Stack navigation |
| **Theme** | `ThemeContext.tsx`, `theme.ts` | Light/Dark mode support |
| **Local Storage** | `storage/index.ts` | AsyncStorage wrapper |
| **Type Safety** | `types/index.ts` | Full TypeScript support |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd PaisaTracker
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. Run on Device

- Install Expo Go on your phone
- Scan QR code to run app
- Or press `w` for web browser

---

## 🎨 Customization Guide

### Change Primary Color

Edit `PaisaTracker/src/constants/theme.ts`:
```typescript
primary: '#4CAF50', // Change to your color
```

### Add Expense Category

Edit `PaisaTracker/src/constants/data.ts`:
```typescript
export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'YourNewCategory', // Add here
];
```

### Add New Screen

1. Create file: `PaisaTracker/src/screens/NewScreen.tsx`
2. Add route: `PaisaTracker/src/navigation/AppNavigator.tsx`
3. Add type: `PaisaTracker/src/types/index.ts`

---

## 📱 Tech Stack

### Frontend (PaisaTracker)
- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Native Paper** - UI components
- **AsyncStorage** - Local storage
- **Firebase** - Backend (optional)

### Backend (Future)
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB/PostgreSQL** - Database
- **JWT** - Authentication

---

## 📊 Project Stats

- **Total Screens:** 6
- **Components:** 8+
- **Services:** 3
- **Hooks:** 4
- **Contexts:** 2
- **Lines of Code:** ~1800+

---

## 🎯 Development Workflow

```bash
# Start development
cd PaisaTracker
npm start

# Add new feature
# 1. Create screen/component in src/
# 2. Add types in src/types/
# 3. Add navigation route if needed
# 4. Test on Expo Go

# Build for production
eas build --platform android
eas build --platform ios
```

---

## 🔥 Next Steps

1. **Test the App:** Run `npm start` in PaisaTracker/
2. **Enable Firebase:** Follow Firebase setup guide
3. **Customize:** Change colors, add features
4. **Deploy:** Build production apps

---

## 📞 Support

- **Quick Start:** See `PaisaTracker/START_HERE.md`
- **Full Docs:** See `PaisaTracker/README.md`
- **Firebase:** See Firebase setup guides
- **Issues:** Check troubleshooting sections

---

**Ready to track expenses?** 🚀

```bash
cd PaisaTracker
npm install
npm start
```
