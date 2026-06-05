# 💰 PaisaTrack Nepal

A modern, production-ready React Native mobile application for personal finance management, specifically designed for Nepalese users.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)

---

## 🎯 Features

### 📊 **Dashboard**
- Monthly budget overview with real-time tracking
- Today's spending summary
- Category breakdown with interactive pie charts
- Spending trends and analytics
- Quick expense entry with FAB button

### 💳 **Transactions**
- Separate expense and income tracking
- Search and filter by category
- 10 expense categories (Food, Transport, Rent, etc.)
- 5 payment methods (Cash, eSewa, Khalti, Bank, Fonepay)
- Detailed transaction cards with payment method icons

### 📈 **Reports & Analytics**
- Monthly financial summary
- Category-wise expense breakdown
- 6-month spending trends
- AI-generated insights
- Key metrics (highest category, avg daily expense, savings rate)

### 💰 **Budget Management**
- Set overall and category-specific budgets
- Visual progress bars with color coding
- Budget alerts (80%, 90%, 100% usage)
- Remaining/exceeded amount tracking

### 👤 **Profile & Settings**
- **Dark/Light mode toggle** 🌙☀️
- User profile with avatar
- Export data functionality
- App version and information

### 🇳🇵 **Nepal-Specific Features**
- NPR currency (Rs.)
- Local payment methods: eSewa, Khalti, Fonepay
- Designed for Nepalese users
- Bilingual ready (English/Nepali)

---

## 🌙 Dark Mode

**Fully functional dark/light theme toggle!**

- Tap the moon/sun icon at top-right
- Instant theme switching
- Persists across app restarts
- All screens support both themes
- Easy on the eyes in any lighting

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional)
- Android Studio or Xcode (for emulators)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Bibek1619/paisa-tracker.git
cd paisa-tracker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

4. **Run on device:**
   - **Android**: `npm run android` or scan QR with Expo Go
   - **iOS**: `npm run ios` (macOS only) or scan QR with Expo Go
   - **Web**: `npm run web`

---

## 📱 Screenshots

### Light Mode
- Dashboard with monthly overview
- Category breakdown charts
- Budget tracking with progress bars

### Dark Mode
- Full dark theme support
- Eye-friendly color palette
- All features work seamlessly

---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 56
- **Language**: TypeScript (strict mode)
- **Navigation**: React Navigation (Bottom Tabs)
- **UI Components**: React Native Paper
- **Storage**: AsyncStorage (local persistence)
- **Charts**: React Native Chart Kit
- **Icons**: Ionicons from @expo/vector-icons
- **State Management**: Custom hooks
- **Theme**: Context API with dark/light modes

---

## 📁 Project Structure

```
PaisaTrack/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── common/
│   │   └── forms/
│   ├── contexts/            # Theme context for dark/light mode
│   ├── constants/           # Colors, theme, data constants
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation configuration
│   ├── screens/             # Main app screens (5)
│   ├── services/            # Business logic & analytics
│   ├── storage/             # AsyncStorage wrapper
│   ├── types/               # TypeScript definitions
│   └── utils/               # Helper functions & seed data
├── assets/                  # Images, fonts, icons
├── App.tsx                  # Root component
└── package.json
```

---

## 🎨 Design

### Color Palette
- **Primary**: #2563EB (Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Background**: #F5F7FA (Light) / #0F172A (Dark)

### Key Design Principles
- Material Design 3
- Clean, modern interface
- Intuitive navigation
- Responsive layout
- Accessibility-friendly

---

## 💾 Data Management

### Local Storage
- All data stored securely using AsyncStorage
- Persists between app restarts
- Export functionality for backups
- Ready for cloud sync integration

### Sample Data
- App includes seed data for testing
- Realistic expense and income entries
- Pre-configured budgets
- Multiple categories and payment methods

---

## 📊 Features in Detail

### Expense Categories (10)
1. 🍔 Food
2. 🚗 Transport
3. 🏠 Rent
4. 🛍️ Shopping
5. 📚 Education
6. 🏥 Health
7. 🎬 Entertainment
8. 📱 Mobile Recharge
9. 🌐 Internet
10. 📦 Others

### Payment Methods (5)
1. 💵 Cash
2. 💳 eSewa
3. 💳 Khalti
4. 🏦 Bank
5. 💳 Fonepay

### Income Sources (5)
1. 💼 Salary
2. 💻 Freelance
3. 🏢 Business
4. 🎁 Gift
5. 📦 Other

---

## 🔮 Future Enhancements

- [ ] Firebase authentication
- [ ] Cloud data synchronization
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Receipt photo attachments
- [ ] Export to PDF/Excel
- [ ] Biometric authentication
- [ ] Shared budgets with family
- [ ] Expense splitting

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Dark Mode
1. Open the app
2. Look at top-right corner
3. Tap moon icon 🌙
4. Watch entire app switch themes!
5. Tap sun icon ☀️ to switch back

### Test Features
- Add new expenses/income
- Set budgets and track progress
- View reports and analytics
- Search and filter transactions
- Export data

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Bibek**

- GitHub: [@Bibek1619](https://github.com/Bibek1619)
- Repository: [paisa-tracker](https://github.com/Bibek1619/paisa-tracker)

---

## 🙏 Acknowledgments

- Designed for Nepalese users with local payment methods
- Inspired by modern expense tracking apps
- Built with React Native and Expo
- UI design inspired by Material Design 3

---

## 📞 Support

For support, please open an issue in the GitHub repository or contact through GitHub.

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for Nepal** 🇳🇵

**Track Your Paisa, Achieve Your Goals!** 💰✨
