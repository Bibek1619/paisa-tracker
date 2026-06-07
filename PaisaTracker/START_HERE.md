# 🚀 Quick Start Guide - PaisaTracker

Get your expense tracker running in **2 minutes**!

## ✅ Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages (React Native, Expo, Firebase, etc.)

## ✅ Step 2: Start the App

```bash
npm start
```

You'll see a QR code in the terminal.

## ✅ Step 3: Run on Your Phone

### Option A: Use Your Phone (Recommended)

1. **Install Expo Go:**
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Scan the QR Code:**
   - Android: Open Expo Go app → Scan QR
   - iOS: Open Camera app → Point at QR → Tap notification

3. **App loads!** 🎉

### Option B: Use Web Browser

Press `w` in the terminal to open in your browser.

## ✅ Step 4: Login (Demo Mode)

- Enter **any email** (e.g., `demo@test.com`)
- Enter **any password** (e.g., `123456`)
- Click **Login**

The app works in demo mode without Firebase! ✨

## 📱 Features to Try

1. **Dashboard** - See your financial overview
2. **Transactions** - Track expenses and income
3. **Reports** - View analytics and charts
4. **Budget** - Set monthly budgets
5. **Profile** - View settings and logout

## 🔥 Enable Firebase (Optional)

To enable cloud sync:

1. Create Firebase project: https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy config to `src/config/firebase.ts`

## 🐛 Troubleshooting

### App won't start?
```bash
npm start --clear
```

### Dependencies error?
```bash
rm -rf node_modules
npm install
```

### Phone not connecting?
- Ensure phone and computer on same WiFi
- Try tunnel mode: `npm start --tunnel`

## 📚 Next Steps

- Read the full [README.md](./README.md)
- Explore the code in `src/` folder
- Customize theme in `src/constants/theme.ts`
- Add features in `src/screens/`

---

**Need Help?**
- Check `README.md` for detailed info
- Review code structure in `src/`
- Check Firebase setup guide if using cloud

**Ready to track your paisa?** 💰

Run: `npm start`
