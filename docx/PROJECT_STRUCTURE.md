# PaisaTrack Nepal - Project Structure

## 📁 Complete File Structure

```
PaisaTrack/
│
├── assets/                          # Static assets (images, fonts)
│   ├── icon.png
│   └── splash-icon.png
│
├── src/                             # Source code
│   │
│   ├── components/                  # React components
│   │   ├── cards/                   # Card components (future)
│   │   ├── charts/                  # Chart components
│   │   │   ├── CategoryPieChart.tsx
│   │   │   └── MonthlyBarChart.tsx
│   │   ├── common/                  # Reusable components
│   │   │   ├── BudgetProgressCard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── TransactionCard.tsx
│   │   ├── forms/                   # Form/Modal components
│   │   │   ├── AddExpenseModal.tsx
│   │   │   └── AddIncomeModal.tsx
│   │   └── index.ts                 # Component exports
│   │
│   ├── constants/                   # App constants
│   │   ├── data.ts                  # Categories, payment methods, etc.
│   │   └── theme.ts                 # Colors, spacing, typography
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useBudgets.ts
│   │   ├── useExpenses.ts
│   │   ├── useIncome.ts
│   │   └── index.ts                 # Hook exports
│   │
│   ├── navigation/                  # Navigation configuration
│   │   └── AppNavigator.tsx         # Bottom tab navigator
│   │
│   ├── screens/                     # Screen components
│   │   ├── BudgetScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   └── TransactionsScreen.tsx
│   │
│   ├── services/                    # Business logic services
│   │   └── analyticsService.ts      # Analytics calculations
│   │
│   ├── storage/                     # Data persistence layer
│   │   └── index.ts                 # AsyncStorage operations
│   │
│   ├── types/                       # TypeScript definitions
│   │   └── index.ts                 # All type definitions
│   │
│   └── utils/                       # Utility functions
│       ├── helpers.ts               # Helper functions
│       └── seedData.ts              # Test data generator
│
├── .gitignore                       # Git ignore file
├── app.json                         # Expo configuration
├── App.tsx                          # Root component
├── DEVELOPMENT.md                   # Development guide
├── index.ts                         # App entry point
├── package.json                     # Dependencies
├── PROJECT_STRUCTURE.md             # This file
├── README.md                        # Project documentation
└── tsconfig.json                    # TypeScript configuration
```

## 📦 Core Modules

### 1. Types (`src/types/index.ts`)
Defines all TypeScript interfaces:
- `Expense`, `Income`, `Budget`
- `ExpenseCategory`, `PaymentMethod`, `IncomeSource`
- `MonthlyStats`, `CategoryBreakdown`, `MonthlyTrend`
- `Insight`, `UserSettings`

### 2. Constants (`src/constants/`)

**theme.ts:**
- Color palette (COLORS)
- Category colors (CATEGORY_COLORS)
- Icon mappings (CATEGORY_ICONS, PAYMENT_METHOD_ICONS)
- Spacing, border radius, font sizes

**data.ts:**
- Expense categories array
- Payment methods array
- Income sources array
- Quick amount buttons
- Budget thresholds
- Storage keys

### 3. Storage (`src/storage/index.ts`)
AsyncStorage wrapper functions:
- `saveExpenses()`, `getExpenses()`, `addExpense()`, `deleteExpense()`
- `saveIncome()`, `getIncome()`, `addIncome()`, `deleteIncome()`
- `saveBudgets()`, `getBudgets()`, `addOrUpdateBudget()`, `deleteBudget()`
- `saveSettings()`, `getSettings()`
- `clearAllData()`, `exportData()`

### 4. Hooks (`src/hooks/`)

**useExpenses.ts:**
- State management for expenses
- CRUD operations
- Loading and error handling

**useIncome.ts:**
- State management for income
- CRUD operations
- Loading and error handling

**useBudgets.ts:**
- State management for budgets
- CRUD operations
- Loading and error handling

### 5. Utils (`src/utils/`)

**helpers.ts:**
- `formatCurrency()` - Format numbers as NPR currency
- `formatDate()`, `formatShortDate()` - Date formatting
- `getCurrentMonth()`, `getCurrentYear()` - Date utilities
- `filterByMonth()` - Filter transactions by month
- `calculateMonthlyStats()` - Calculate financial statistics
- `calculatePercentage()` - Percentage calculations
- `getBudgetStatus()` - Determine budget status
- `generateId()` - Generate unique IDs
- `sortByDate()` - Sort transactions
- `getLastSixMonths()` - Get last 6 months data

**seedData.ts (optional):**
- `generateSeedExpenses()` - Generate test expenses
- `generateSeedIncome()` - Generate test income
- `generateSeedBudgets()` - Generate test budgets
- `seedAllData()` - Populate all test data

### 6. Services (`src/services/`)

**analyticsService.ts:**
- `calculateCategoryBreakdown()` - Expense distribution by category
- `calculateMonthlyTrends()` - Last 6 months trend data
- `generateInsights()` - AI-like financial insights
- `calculateAverageDailyExpense()` - Average daily spending
- `getHighestSpendingCategory()` - Top spending category

### 7. Components (`src/components/`)

**Common:**
- `StatsCard` - Reusable stat display card
- `TransactionCard` - Display expense/income transaction
- `BudgetProgressCard` - Budget progress with bar

**Charts:**
- `CategoryPieChart` - Pie chart for category breakdown
- `MonthlyBarChart` - Bar chart for monthly trends

**Forms:**
- `AddExpenseModal` - Modal form to add expense
- `AddIncomeModal` - Modal form to add income

### 8. Screens (`src/screens/`)

**DashboardScreen:**
- Monthly stats cards (Budget, Income, Expense, Savings)
- Today's spending card
- Category pie chart
- Recent transactions list
- Floating action button

**TransactionsScreen:**
- Tabs for expenses and income
- Search functionality
- Category filter (for expenses)
- Transaction cards
- Add buttons for both types

**ReportsScreen:**
- Monthly summary card
- Key metrics cards
- Category pie chart
- 6-month bar chart
- Insights cards

**BudgetScreen:**
- Budget list with progress bars
- Add budget modal
- Category selection
- Budget alerts (80%, 90%, 100%)

**ProfileScreen:**
- User profile header
- Settings section (dark mode placeholder)
- Data management (export, backup, clear)
- About section (privacy, help, version)

### 9. Navigation (`src/navigation/`)

**AppNavigator.tsx:**
- Bottom tab navigator with 5 tabs
- Icon configuration
- Tab bar styling
- Screen routing

## 🔄 Data Flow

```
User Action
    ↓
Screen Component
    ↓
Custom Hook (useExpenses, useIncome, useBudgets)
    ↓
Storage Layer (AsyncStorage)
    ↓
Local Device Storage
```

## 🎨 Design System

### Color Scheme
- **Primary Blue:** #2563EB - Main actions, selected items
- **Success Green:** #10B981 - Income, positive values
- **Warning Orange:** #F59E0B - Alerts, moderate status
- **Danger Red:** #EF4444 - Expenses, negative values
- **Background:** #F8FAFC - App background
- **White:** #FFFFFF - Card backgrounds
- **Gray Scale:** 50-900 for text and borders

### Typography Scale
- **XXL (32px):** Screen titles
- **XL (20px):** Section headings
- **LG (18px):** Card titles
- **MD (16px):** Body text
- **SM (14px):** Subtitles
- **XS (12px):** Captions

### Spacing Scale
- **XS (4px):** Minimal spacing
- **SM (8px):** Small spacing
- **MD (16px):** Standard spacing
- **LG (24px):** Large spacing
- **XL (32px):** Extra large spacing

## 🚀 Feature Checklist

### ✅ Implemented
- [x] Dashboard with stats
- [x] Add/View expenses
- [x] Add/View income
- [x] Category breakdown chart
- [x] Monthly trend chart
- [x] Budget management
- [x] Budget progress tracking
- [x] Budget alerts
- [x] Transaction search
- [x] Category filtering
- [x] Financial insights
- [x] Data export
- [x] Local storage persistence
- [x] Profile settings
- [x] Today's spending tracker
- [x] Monthly statistics

### 🔮 Planned (Future)
- [ ] Firebase authentication
- [ ] Cloud data sync
- [ ] Dark mode
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Multi-currency support
- [ ] Export to PDF
- [ ] Biometric authentication
- [ ] Shared budgets
- [ ] Expense splitting

## 📊 Data Models

### Storage Keys
```
@expenses - Array of Expense objects
@income - Array of Income objects
@budgets - Array of Budget objects
@settings - UserSettings object
```

### Expense Categories
Food, Transport, Rent, Shopping, Education, Health, Entertainment, Mobile Recharge, Internet, Others

### Payment Methods
Cash, eSewa, Khalti, Bank, Fonepay

### Income Sources
Salary, Freelance, Business, Gift, Other

## 🔧 Configuration Files

### app.json
- App name and slug
- Version info
- Platform configurations (iOS, Android, Web)
- Icon and splash screen paths
- Bundle identifiers

### package.json
- Dependencies list
- Scripts (start, android, ios, web)
- Project metadata

### tsconfig.json
- TypeScript compiler options
- Extends Expo base config
- Strict mode enabled

## 💡 Development Patterns

### Component Pattern
```typescript
interface Props {
  // Props definition
}

export const Component: React.FC<Props> = ({ props }) => {
  // State
  // Effects
  // Handlers
  // Render
  return <View>...</View>;
};

const styles = StyleSheet.create({
  // Styles
});
```

### Hook Pattern
```typescript
export const useCustomHook = () => {
  const [state, setState] = useState();
  
  const loadData = async () => {
    // Load from storage
  };
  
  const addItem = async (item) => {
    // Add to storage
  };
  
  return { state, loadData, addItem };
};
```

### Storage Pattern
```typescript
export const getData = async (): Promise<Type[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveData = async (data: Type[]): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
};
```

---

This structure ensures:
- ✅ Clean separation of concerns
- ✅ Reusable components
- ✅ Type safety with TypeScript
- ✅ Scalable architecture
- ✅ Easy to test
- ✅ Ready for future enhancements
