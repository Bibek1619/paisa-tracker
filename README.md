# 💰 PaisaTrack - Expense Tracker for Nepal

A complete expense tracking mobile application built with React Native and Firebase, designed specifically for Nepalese users.

## 📁 Project Structure

```
expence-tracker/
├── PaisaTrack/              # Frontend - React Native Mobile App
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # App screens
│   │   ├── services/        # Firebase backend services
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   └── ...
│   ├── App.tsx              # Main app entry
│   ├── package.json
│   └── README.md            # Frontend documentation
│
└── (Future: backend, docs, deployment folders)
```

## ✨ Features

- 📊 **Track Expenses** - 10 categories (Food, Transport, Rent, etc.)
- 💵 **Track Income** - Multiple income sources
- 📈 **Budget Management** - Set and monitor monthly budgets
- 📉 **Reports & Analytics** - Charts and spending insights
- 🔐 **User Authentication** - Firebase login/register
- ☁️ **Cloud Sync** - Firestore database
- 🇳🇵 **Nepal-Specific** - NPR currency, eSewa, Khalti, Fonepay
- 🌙 **Dark Mode** - Light/Dark theme toggle (UI ready)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
# Navigate to frontend folder
cd PaisaTrack

# Install dependencies
npm install

# Start the development server
npm start
```

### Run on Device

- **Android:** Scan QR code with Expo Go app
- **iOS:** Scan QR code with Camera app (opens in Expo Go)
- **Web:** Press `w` in terminal

## 🔥 Firebase Setup (Optional)

The app works in **demo mode** without Firebase. To enable cloud features:

1. Create Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy Firebase config
5. Update `PaisaTrack/src/config/firebase.ts`

**Detailed guide:** See `PaisaTrack/QUICKSTART_FIREBASE.md`

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Native Paper** - UI components
- **React Native Chart Kit** - Charts

### Backend
- **Firebase Authentication** - User login/register
- **Firestore** - NoSQL database
- **AsyncStorage** - Local storage (demo mode)

## 📱 Screens

1. **Dashboard** - Overview, budget, today's spending, charts
2. **Transactions** - List of all expenses and income
3. **Reports** - Analytics, charts, spending insights
4. **Budget** - Set and manage budgets
5. **Profile** - User settings, logout
6. **Login/Register** - Authentication

## 📊 Database Schema

### Collections

- **users** - User profiles
- **expenses** - User expenses
- **income** - User income
- **budgets** - Budget settings

See `PaisaTrack/BACKEND_PLAN.md` for detailed schema.

## 🧪 Testing

```bash
cd PaisaTrack
npm start
```

**Demo Mode:**
- App loads with seed data
- No login required
- Data stored locally

**Firebase Mode:**
- Login screen appears
- User authentication
- Cloud data sync

## 📚 Documentation

All documentation is in the `PaisaTrack/` folder:

- **START_HERE.md** - Quick start guide
- **QUICKSTART_FIREBASE.md** - Firebase setup (10 min)
- **BACKEND_COMPLETE.md** - Backend implementation details
- **FIREBASE_SETUP.md** - Detailed Firebase guide
- **HOW_TO_TEST.md** - Testing guide

## 🎯 Project Status

- ✅ Frontend: 100% Complete
- ✅ Backend Integration: 100% Complete
- ✅ Firebase Auth: Ready
- ✅ Firestore Database: Ready
- ⚠️ Needs: Your Firebase credentials (10 min setup)

## 🚀 Deployment

### Build for Production

```bash
cd PaisaTrack

# Android
npx expo build:android

# iOS
npx expo build:ios
```

### Expo EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build
eas build --platform android
eas build --platform ios
```

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License - see `PaisaTrack/LICENSE`

## 👨‍💻 Author

Built with ❤️ for Nepalese users

## 🔗 Links

- **GitHub:** https://github.com/Bibek1619/paisa-tracker
- **Demo:** Run `npm start` in PaisaTrack folder

## 📞 Support

For questions or issues:
1. Check documentation in `PaisaTrack/` folder
2. Read `PaisaTrack/START_HERE.md`
3. Check Firebase setup guide

---

**Ready to track your paisa? Get started in `PaisaTrack/` folder!** 🚀
