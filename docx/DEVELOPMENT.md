# Development Guide - PaisaTrack Nepal

## 🚀 Quick Start

### First Time Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on Android device/emulator:
```bash
npm run android
```

4. Run on iOS device/simulator (macOS only):
```bash
npm run ios
```

## 🧪 Testing with Seed Data (Optional)

To populate the app with sample data for testing:

1. Open `src/utils/seedData.ts`
2. Import and call `seedAllData()` in your `App.tsx` during development:

```typescript
import { seedAllData } from './src/utils/seedData';

useEffect(() => {
  // For testing only - remove in production
  seedAllData();
}, []);
```

3. Remember to remove this before production build!

## 📱 Development Tips

### Hot Reload
- Press `r` in the terminal to reload the app
- Shake your device to open the developer menu
- Enable Fast Refresh for instant updates

### Debugging
- Use React Native Debugger
- Enable Debug JS Remotely from the developer menu
- Use `console.log()` statements
- Check Metro Bundler terminal for errors

### Common Issues

**Metro Bundler Issues:**
```bash
npm start -- --reset-cache
```

**Build Errors:**
```bash
rm -rf node_modules
npm install
```

**Android Build Issues:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## 🏗️ Architecture Overview

### State Management
- Custom hooks for data management (useExpenses, useIncome, useBudgets)
- AsyncStorage for local persistence
- No global state library needed for MVP

### Data Flow
1. Screens use custom hooks
2. Hooks interact with storage layer
3. Storage layer uses AsyncStorage
4. Services provide business logic

### Navigation
- Bottom Tab Navigator (5 main screens)
- No stack navigation needed for MVP
- Modal-based forms for data entry

## 🎨 Styling Guidelines

### Colors
Use constants from `src/constants/theme.ts`:
- Primary: `COLORS.primary` (#2563EB)
- Success: `COLORS.success` (#10B981)
- Danger: `COLORS.danger` (#EF4444)

### Spacing
Use constants from `src/constants/theme.ts`:
- `SPACING.xs` (4px)
- `SPACING.sm` (8px)
- `SPACING.md` (16px)
- `SPACING.lg` (24px)
- `SPACING.xl` (32px)

### Typography
- Use `FONT_SIZES` constants
- Bold weights for titles
- Regular weights for body text

## 📝 Code Style

### TypeScript
- Always define types for props
- Use interfaces for complex objects
- Avoid `any` type
- Enable strict mode in tsconfig

### Components
- Functional components with hooks
- Props interface defined above component
- Styles at bottom of file
- Exports at top of file

### File Naming
- Components: PascalCase (e.g., `DashboardScreen.tsx`)
- Utilities: camelCase (e.g., `helpers.ts`)
- Constants: camelCase (e.g., `theme.ts`)

## 🔧 Adding New Features

### New Screen
1. Create screen file in `src/screens/`
2. Add to navigator in `src/navigation/AppNavigator.tsx`
3. Add icon in tab bar config

### New Component
1. Create component in appropriate folder under `src/components/`
2. Export from component file
3. Import where needed

### New Data Type
1. Add type to `src/types/index.ts`
2. Update storage layer if persistent
3. Update relevant hooks

### New Category/Payment Method
1. Update types in `src/types/index.ts`
2. Add to constants in `src/constants/data.ts`
3. Add icon mapping in `src/constants/theme.ts`
4. Add color mapping if needed

## 🚢 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA (requires Apple Developer account)
```bash
expo build:ios
```

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas login
eas build --platform android
eas build --platform ios
```

## 📊 Performance Tips

- Use `React.memo()` for expensive components
- Implement virtualization for long lists (use FlatList)
- Optimize images (compress before adding to assets)
- Lazy load screens if needed
- Profile with React DevTools

## 🔒 Security Considerations

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize data before storage
- Use secure connections for future API calls

## 🌐 Future Integration Guide

### Firebase Setup (Prepared Architecture)
The app is ready for Firebase integration:

1. Install Firebase packages:
```bash
npm install firebase @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

2. Create `src/services/firebaseService.ts`
3. Replace AsyncStorage calls with Firestore calls
4. Add authentication flow
5. Implement cloud sync logic

### Key Files to Update
- `src/storage/index.ts` - Add Firebase methods
- `src/hooks/` - Update to use Firebase
- `App.tsx` - Add Firebase initialization
- Add authentication screens

## 📞 Support

For questions or issues:
- Check the README.md
- Review code comments
- Check React Native documentation
- Check Expo documentation

---

Happy Coding! 🚀
