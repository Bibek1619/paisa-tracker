# PaisaTracker Mobile App

React Native mobile application for expense tracking, built with Expo and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📱 Features

- Track expenses across 10 categories
- Monitor income from multiple sources
- Set and manage monthly budgets
- View analytics and reports
- User authentication with Firebase
- Cloud data sync with Firestore
- Nepal-specific features (NPR, eSewa, Khalti)

## 🛠️ Tech Stack

- React Native
- Expo SDK 56
- TypeScript
- React Navigation
- Firebase (Auth + Firestore)
- React Native Paper
- React Native Chart Kit

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── services/        # Firebase services
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── navigation/      # Navigation setup
│   └── ...
├── assets/              # Images, icons
├── App.tsx              # Main app component
└── package.json
```

## 📚 Documentation

See the `../docs/` folder for:
- `START_HERE.md` - Quick start guide
- `QUICKSTART_FIREBASE.md` - Firebase setup
- `BACKEND_PLAN.md` - Architecture details
- And more...

## 🔥 Firebase Setup

The app works in demo mode without Firebase. To enable cloud features:

1. Create Firebase project
2. Enable Authentication & Firestore
3. Update `src/config/firebase.ts`

See `../docs/QUICKSTART_FIREBASE.md` for detailed instructions.

## 🧪 Testing

```bash
npm start
```

- Scan QR code with Expo Go app
- Test on physical device or emulator

## 📦 Building

```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

## 🤝 Contributing

This is part of the PaisaTracker monorepo. See root README for contribution guidelines.

## 📄 License

MIT License - see `../LICENSE`
