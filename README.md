# PaisaTrack Nepal 🇳🇵

A modern, production-ready React Native mobile application for personal finance management, specifically designed for Nepalese users.

## 🚀 Features

- **Dashboard**: Overview of monthly budget, income, expenses, and savings
- **Transactions**: Track expenses and income with detailed categorization
- **Reports**: Visual analytics with pie charts and bar charts
- **Budget Management**: Set and monitor category-wise and overall budgets
- **Profile**: User settings and data management

## 📱 Screenshots

The app design is inspired by modern Material Design principles with a clean, intuitive interface.

## 🛠️ Tech Stack

- **React Native** with Expo SDK 56
- **TypeScript** for type safety
- **React Navigation** for routing
- **React Native Paper** for UI components
- **AsyncStorage** for local data persistence
- **React Native Chart Kit** for data visualization
- **Ionicons** for icons

## 🎨 Theme

- Primary: #2563EB (Blue)
- Success: #10B981 (Green)
- Warning: #F59E0B (Orange)
- Danger: #EF4444 (Red)
- Background: #F8FAFC (Light Gray)

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd PaisaTrack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

5. Run on iOS (macOS only):
```bash
npm run ios
```

## 📁 Project Structure

```
PaisaTrack/
├── src/
│   ├── components/
│   │   ├── cards/          # Card components
│   │   ├── charts/         # Chart components
│   │   ├── common/         # Reusable components
│   │   └── forms/          # Form components (modals)
│   ├── constants/          # Theme, colors, data constants
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Screen components
│   ├── services/           # Business logic services
│   ├── storage/            # AsyncStorage utilities
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── assets/                 # Images, fonts, etc.
├── App.tsx                 # Root component
└── package.json
```

## 🔧 Key Components

### Custom Hooks
- `useExpenses`: Manage expense data
- `useIncome`: Manage income data
- `useBudgets`: Manage budget data

### Core Screens
- `DashboardScreen`: Main overview with stats and charts
- `TransactionsScreen`: List and filter transactions
- `ReportsScreen`: Analytics and insights
- `BudgetScreen`: Budget management
- `ProfileScreen`: Settings and profile

### Services
- `analyticsService`: Calculate insights and statistics
- `storage`: Local data persistence with AsyncStorage

## 💾 Data Models

### Expense
```typescript
{
  id: string;
  amount: number;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  note: string;
  date: string;
  createdAt: string;
}
```

### Income
```typescript
{
  id: string;
  amount: number;
  source: IncomeSource;
  note: string;
  date: string;
  createdAt: string;
}
```

### Budget
```typescript
{
  id: string;
  category: ExpenseCategory | 'overall';
  limitAmount: number;
  currentSpent: number;
  month: number;
  year: number;
}
```

## 🌟 Features in Detail

### Dashboard
- Monthly budget overview
- Income/Expense/Savings cards
- Today's spending tracker
- Category breakdown pie chart
- Recent transactions list
- Floating action button for quick expense entry

### Transactions
- Separate tabs for expenses and income
- Search functionality
- Category filtering
- Payment method tracking
- Quick add buttons

### Reports
- Monthly summary cards
- Category pie chart
- 6-month trend bar chart
- Key metrics (highest category, avg daily expense, savings rate)
- AI-generated insights

### Budget Management
- Set overall budget
- Category-wise budgets
- Visual progress bars
- Color-coded alerts (80%, 90%, 100%)
- Budget exceeded warnings

## 🔮 Future Enhancements

- Firebase authentication
- Cloud data sync
- Multi-currency support
- Recurring transactions
- Bill reminders
- Export to PDF/Excel
- Dark mode
- Biometric authentication
- Shared budgets with family

## 📄 License

MIT License

## 👨‍💻 Developer

Created with ❤️ for Nepalese users

---

**Note**: This is an MVP version with local storage. Firebase integration and cloud sync features are prepared in the architecture but not yet implemented.
