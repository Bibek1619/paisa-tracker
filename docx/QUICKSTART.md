# 🚀 PaisaTrack Nepal - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js (v16 or higher) - Check: `node --version`
- ✅ npm or yarn - Check: `npm --version`
- ✅ Expo CLI (optional) - Install: `npm install -g expo-cli`

### Step 1: Navigate to Project
```bash
cd PaisaTrack
```

### Step 2: Install Dependencies
```bash
npm install
```
⏱️ This will take 2-3 minutes

### Step 3: Start Development Server
```bash
npm start
```

You'll see a QR code in the terminal.

### Step 4: Run on Device/Emulator

#### Option A: Physical Device
1. Install **Expo Go** app from:
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Scan the QR code with:
   - **Android:** Expo Go app
   - **iOS:** Camera app (opens in Expo Go)

#### Option B: Android Emulator
```bash
npm run android
```
*Requires Android Studio and emulator setup*

#### Option C: iOS Simulator (macOS only)
```bash
npm run ios
```
*Requires Xcode installation*

## 📱 First Run Experience

When you first open the app:
1. **Dashboard** will be empty (no transactions yet)
2. Tap the **blue + button** to add your first expense
3. Navigate through tabs to explore features
4. Go to **Profile** to customize settings

## 🎯 Quick Feature Tour

### Add Your First Expense
1. Open app → **Dashboard** tab
2. Tap the **floating + button**
3. Enter amount: e.g., `500`
4. Select category: **Food**
5. Select payment: **Cash**
6. Tap **Save Expense**

### Add Your First Income
1. Go to **Transactions** tab
2. Tap the **green + icon** (top right)
3. Enter amount: e.g., `50000`
4. Select source: **Salary**
5. Tap **Save Income**

### Set Your First Budget
1. Go to **Budget** tab
2. Tap the **+ button** (top right)
3. Select **Overall Budget**
4. Enter limit: e.g., `30000`
5. Tap **Save Budget**

### View Reports
1. Go to **Reports** tab
2. See charts and analytics
3. Read financial insights

## 🧪 Test with Sample Data (Optional)

Want to see the app with data already populated?

1. Open `App.tsx`
2. Add this import at the top:
```typescript
import { seedAllData } from './src/utils/seedData';
import { useEffect } from 'react';
```

3. Inside the App component, add:
```typescript
useEffect(() => {
  seedAllData();
}, []);
```

4. Save and reload the app

**⚠️ Important:** Remove this code before building for production!

## 🔧 Useful Commands

### Development
```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS (macOS only)
npm run web         # Run in web browser
```

### Troubleshooting
```bash
npm start -- --clear    # Clear cache and start
rm -rf node_modules     # Remove node_modules
npm install             # Reinstall dependencies
```

### Metro Bundler Commands
While `npm start` is running:
- Press **`r`** to reload app
- Press **`m`** to toggle menu
- Press **`d`** to open developer menu
- Press **`j`** to open debugger

## 📊 Understanding the App

### 5 Main Screens

1. **📊 Dashboard**
   - Monthly overview
   - Quick stats
   - Recent transactions
   - Add expense button

2. **📝 Transactions**
   - View all expenses and income
   - Search and filter
   - Add new entries

3. **📈 Reports**
   - Visual charts
   - Monthly trends
   - Financial insights

4. **💰 Budget**
   - Set spending limits
   - Track progress
   - View alerts

5. **👤 Profile**
   - User settings
   - Export data
   - App information

## 🎨 Customization Tips

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name"
  }
}
```

### Add New Category
1. Open `src/types/index.ts`
2. Add to `ExpenseCategory` type
3. Open `src/constants/data.ts`
4. Add to `EXPENSE_CATEGORIES` array
5. Open `src/constants/theme.ts`
6. Add icon mapping and color

### Change Colors
Edit `src/constants/theme.ts`:
```typescript
export const COLORS = {
  primary: '#YOUR_COLOR',
  // ... other colors
};
```

## 🐛 Common Issues

### Issue: "Module not found"
**Solution:**
```bash
npm install
npm start -- --clear
```

### Issue: "Unable to resolve module"
**Solution:**
```bash
watchman watch-del-all
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Issue: Android build fails
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: iOS build fails
**Solution:**
```bash
cd ios
pod install
cd ..
npm run ios
```

## 📚 Next Steps

1. **Read the full README.md** for detailed documentation
2. **Check DEVELOPMENT.md** for development guidelines
3. **Review PROJECT_STRUCTURE.md** to understand architecture
4. **Explore the code** starting from `App.tsx`

## 🆘 Getting Help

- Check the **README.md** for detailed information
- Review **DEVELOPMENT.md** for dev tips
- Read **PROJECT_STRUCTURE.md** for architecture
- Check React Native docs: https://reactnative.dev
- Check Expo docs: https://docs.expo.dev

## ✅ Success Checklist

- [ ] Installed dependencies
- [ ] Started dev server
- [ ] App running on device/emulator
- [ ] Added first expense
- [ ] Added first income
- [ ] Set first budget
- [ ] Viewed reports
- [ ] Explored all tabs

## 🎉 You're Ready!

Congratulations! You now have PaisaTrack Nepal running. Start tracking your expenses and take control of your finances! 💰

---

**Pro Tip:** Keep the Expo Go app installed on your phone for quick testing during development!
