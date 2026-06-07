# 💰 PaisaTracker - React Native Mobile App

A complete expense tracking mobile application built with React Native and Expo for Nepalese users.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Expo Go app on your phone (iOS/Android)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Run on Device

1. Install **Expo Go** on your phone:
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code from the terminal with:
   - **Android:** Expo Go app
   - **iOS:** Camera app (opens in Expo Go)

3. Or press `w` in terminal to run on web browser

## 📱 Features

- ✅ **Login/Register** - User authentication (demo mode)
- ✅ **Dashboard** - Financial overview
- ✅ **Transactions** - Track expenses and income
- ✅ **Reports** - Analytics and charts
- ✅ **Budget** - Set monthly budgets
- ✅ **Profile** - User settings
- ✅ **NPR Currency** - Nepal Rupee support
- ✅ **Payment Methods** - eSewa, Khalti, Fonepay, Cash

## 📁 Project Structure

```
PaisaTracker/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── cards/       # Card components
│   │   ├── charts/      # Chart components
│   │   ├── common/      # Common components (buttons, etc)
│   │   └── forms/       # Form components
│   │
│   ├── screens/         # App screens
│   │   ├── DashboardScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   ├── BudgetScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── LoginScreen.tsx
│   │
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── services/        # Backend services
│   │   ├── authService.ts
│   │   ├── firestoreService.ts
│   │   └── analyticsService.ts
│   │
│   ├── hooks/           # Custom hooks
│   │   ├── useExpenses.ts
│   │   ├── useIncome.ts
│   │   ├── useBudgets.ts
│   │   └── useThemedColors.ts
│   │
│   ├── navigation/      # Navigation setup
│   │   └── AppNavigator.tsx
│   │
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   │
│   ├── constants/       # Constants and data
│   │   ├── theme.ts
│   │   └── data.ts
│   │
│   ├── config/          # Configuration
│   │   └── firebase.ts
│   │
│   ├── storage/         # Local storage
│   │   └── index.ts
│   │
│   └── utils/           # Utility functions
│       ├── helpers.ts
│       └── seedData.ts
│
├── App.tsx              # Main app entry
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **React Native Paper** - UI components
- **AsyncStorage** - Local storage
- **Firebase** - Backend (optional)

## 🔥 Demo Mode

The app works in **demo mode** without Firebase:
- No Firebase setup required
- Enter any email/password to login
- Data stored locally
- Perfect for testing and development

## 🔧 Firebase Setup (Optional)

To enable cloud features:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy your Firebase config
5. Update `src/config/firebase.ts` with your credentials:

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

## 📱 Screens

1. **Login Screen** - User authentication
2. **Dashboard** - Overview, balance, today's spending
3. **Transactions** - List of expenses and income
4. **Reports** - Charts and analytics
5. **Budget** - Budget management
6. **Profile** - User settings and logout

## 🧪 Testing

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 📦 Building

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🎨 Customization

### Change Theme Colors

Edit `src/constants/theme.ts`:
```typescript
export const colors = {
  light: {
    primary: '#4CAF50', // Change this
    // ...
  }
};
```

### Add New Category

Edit `src/constants/data.ts`:
```typescript
export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  // Add your category here
];
```

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm start --clear
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Expo Go not connecting
- Ensure phone and computer are on same WiFi
- Try using tunnel mode: `npm start --tunnel`

## 📚 Learn More

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase Docs](https://firebase.google.com/docs)

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

MIT License - See LICENSE file in root directory

## 👨‍💻 Support

For issues or questions:
1. Check this README
2. Review code in `src/` folder
3. Check Firebase setup if using cloud features

---

**Ready to track your paisa!** 🚀

Start with: `npm start`
