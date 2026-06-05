# PaisaTrack Nepal - Quick Reference Card

## 🚀 Commands

### Development
```bash
npm start          # Start dev server
npm run android    # Run on Android
npm run ios        # Run on iOS (macOS only)
```

### Build
```bash
expo build:android    # Build Android APK
expo build:ios        # Build iOS IPA
```

## 📂 File Locations

### Add New Category
1. `src/types/index.ts` - Add to type
2. `src/constants/data.ts` - Add to array
3. `src/constants/theme.ts` - Add icon & color

### Add New Screen
1. Create `src/screens/NewScreen.tsx`
2. Update `src/navigation/AppNavigator.tsx`

### Add New Component
1. Create in `src/components/[folder]/`
2. Export in `src/components/index.ts`

## 🎨 Theme Constants

### Colors
```typescript
COLORS.primary    // #2563EB (Blue)
COLORS.success    // #10B981 (Green)
COLORS.warning    // #F59E0B (Orange)
COLORS.danger     // #EF4444 (Red)
COLORS.background // #F8FAFC (Light Gray)
```

### Spacing
```typescript
SPACING.xs  // 4px
SPACING.sm  // 8px
SPACING.md  // 16px
SPACING.lg  // 24px
SPACING.xl  // 32px
```

### Font Sizes
```typescript
FONT_SIZES.xs   // 12px
FONT_SIZES.sm   // 14px
FONT_SIZES.md   // 16px
FONT_SIZES.lg   // 18px
FONT_SIZES.xl   // 20px
FONT_SIZES.xxl  // 24px
FONT_SIZES.xxxl // 32px
```

## 💾 Storage Functions

### Expenses
```typescript
getExpenses()        // Get all
addExpense(expense)  // Add one
deleteExpense(id)    // Delete one
```

### Income
```typescript
getIncome()         // Get all
addIncome(income)   // Add one
deleteIncome(id)    // Delete one
```

### Budgets
```typescript
getBudgets()              // Get all
addOrUpdateBudget(budget) // Add or update
deleteBudget(id)          // Delete one
```

## 🔧 Helper Functions

### Currency
```typescript
formatCurrency(1000)  // "Rs. 1,000"
```

### Dates
```typescript
getCurrentMonth()     // 1-12
getCurrentYear()      // 2024
formatDate(string)    // "5 June, 2024"
```

### Calculations
```typescript
calculatePercentage(value, total)
getBudgetStatus(spent, limit)  // 'safe'|'warning'|'danger'
```

## 📊 Data Types

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

## 🎯 Categories & Options

### Expense Categories
Food, Transport, Rent, Shopping, Education, Health, Entertainment, Mobile Recharge, Internet, Others

### Payment Methods
Cash, eSewa, Khalti, Bank, Fonepay

### Income Sources
Salary, Freelance, Business, Gift, Other

## 🔍 Import Paths

### Components
```typescript
import { StatsCard, TransactionCard } from '../components';
import { CategoryPieChart } from '../components/charts';
```

### Hooks
```typescript
import { useExpenses, useIncome, useBudgets } from '../hooks';
```

### Utils
```typescript
import { formatCurrency, formatDate } from '../utils/helpers';
```

### Constants
```typescript
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../constants/data';
```

### Storage
```typescript
import * as storage from '../storage';
```

## 🐛 Troubleshooting

### Cache Issues
```bash
npm start -- --clear
```

### Module Not Found
```bash
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && pod install && cd ..
```

## 📱 Testing

### Use Sample Data
```typescript
import { seedAllData } from './src/utils/seedData';
seedAllData();  // Run once
```

### Clear Data
```typescript
import * as storage from './src/storage';
await storage.clearAllData();
```

## 📚 Documentation

- **QUICKSTART.md** - Get started in 5 minutes
- **README.md** - Complete overview
- **DEVELOPMENT.md** - Dev guidelines
- **FEATURES.md** - All features explained
- **PROJECT_STRUCTURE.md** - Architecture
- **SUMMARY.md** - Project summary

## ✅ Pre-deployment Checklist

- [ ] Remove seed data calls
- [ ] Test on real devices
- [ ] Update app.json version
- [ ] Check all features work
- [ ] Test empty states
- [ ] Test error handling
- [ ] Update README if needed
- [ ] Build and test APK/IPA

## 🔗 Useful Links

- React Native: https://reactnative.dev
- Expo: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- TypeScript: https://www.typescriptlang.org

---

**Quick Tip:** Keep this file open while developing for quick access to common patterns and functions!
