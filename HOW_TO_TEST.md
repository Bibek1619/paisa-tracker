# How to Test PaisaTrack Nepal - Complete Guide

## 🚀 Quick Start (5 Steps)

### Step 1: Navigate to Project
```bash
cd PaisaTrack
```

### Step 2: Start Development Server
```bash
npm start
```

Wait for QR code to appear...

### Step 3: Open on Your Phone
- Install **Expo Go** from Play Store
- Scan the QR code with Expo Go
- App loads automatically!

### Step 4: Test Dark Mode
1. Look at top-right corner
2. Tap the **moon icon** 🌙
3. Watch the entire app switch to dark theme!
4. Tap the **sun icon** ☀️ to switch back

### Step 5: Explore Features
- Swipe through bottom tabs
- Check the seed data everywhere
- Add new expenses
- View charts and reports

---

## ✅ What to Check

### 1. **Header (Top of Screen)**
Look for:
- ✅ Profile picture (left side)
- ✅ "PaisaTrack Nepal" text
- ✅ Moon/Sun icon (theme toggle)
- ✅ Settings icon

**Test:** Tap moon icon → Dark mode activates

### 2. **Dashboard Screen**
You should see:
- ✅ "Dashboard" title with date
- ✅ Monthly Budget card (Rs. 30,000)
- ✅ Spent card (Rs. 18,500) - Red
- ✅ Remaining card (Rs. 11,500) - Green
- ✅ Today's Expense card
- ✅ Category Breakdown pie chart
- ✅ Spending Trend section
- ✅ Blue FAB button (bottom right)

**Test:** Tap FAB (+) → Add Expense modal opens

### 3. **Transactions Screen**
You should see:
- ✅ Expense/Income tabs
- ✅ Search bar
- ✅ Category filter chips
- ✅ 7 expense transactions
- ✅ 2 income transactions

**Test:** Switch tabs, use search, filter by category

### 4. **Reports Screen**
You should see:
- ✅ Monthly summary card
- ✅ Total Income: Rs. 55,000
- ✅ Total Expense: Rs. 4,550
- ✅ Net Savings: Rs. 50,450
- ✅ Pie chart with categories
- ✅ Bar chart with trends
- ✅ Insights section

**Test:** Scroll through all reports

### 5. **Budget Screen**
You should see:
- ✅ 4 budget cards
- ✅ Overall Budget: Rs. 30,000
- ✅ Food Budget: Rs. 10,000
- ✅ Progress bars with percentages
- ✅ Color-coded alerts

**Test:** Tap + to add new budget

### 6. **Profile Screen**
You should see:
- ✅ User avatar and name
- ✅ Currency: NPR (Rs.)
- ✅ Dark Mode toggle
- ✅ Export Data button
- ✅ Clear Data option
- ✅ App version

**Test:** Toggle dark mode, export data

---

## 🌙 Testing Dark Mode

### Step-by-Step:
1. **Open Dashboard**
2. **Look at top-right corner**
3. **See the moon icon** 🌙
4. **Tap it**
5. **Watch magic happen!** ✨

### What Should Change:
- Background: Light → Dark blue
- Cards: White → Dark gray
- Text: Dark → Light
- Charts: Adapt to dark theme
- All screens change simultaneously

### Test Persistence:
1. Switch to dark mode
2. Close the app completely
3. Reopen the app
4. **Dark mode still active!** ✅

---

## 📊 Testing Seed Data

### Expenses to Check:
1. Food: Rs. 500 (today)
2. Transport: Rs. 200
3. Shopping: Rs. 1,500
4. Mobile Recharge: Rs. 300
5. Food: Rs. 800
6. Entertainment: Rs. 1,000
7. Health: Rs. 250

### Income to Check:
1. Salary: Rs. 50,000 (1st of month)
2. Freelance: Rs. 5,000 (15th of month)

### Budgets to Check:
1. Overall: Rs. 30,000
2. Food: Rs. 10,000
3. Transport: Rs. 5,000
4. Entertainment: Rs. 3,000

### Where to Find:
- **Dashboard**: See summary
- **Transactions**: See full list
- **Reports**: See analytics
- **Budget**: See budget tracking

---

## 🎯 Feature Checklist

Test each feature:

### Navigation
- [ ] Tap Dashboard tab
- [ ] Tap Transactions tab
- [ ] Tap Reports tab
- [ ] Tap Budget tab
- [ ] Tap Profile tab
- [ ] All tabs work smoothly

### Theme Toggle
- [ ] Tap moon icon
- [ ] App switches to dark
- [ ] Tap sun icon
- [ ] App switches to light
- [ ] Close and reopen
- [ ] Theme persists

### Add Expense
- [ ] Tap FAB button (+)
- [ ] Modal opens
- [ ] Enter amount
- [ ] Select category
- [ ] Select payment method
- [ ] Tap Save
- [ ] Expense appears in list

### Add Income
- [ ] Go to Transactions
- [ ] Tap income + button
- [ ] Enter amount
- [ ] Select source
- [ ] Tap Save
- [ ] Income appears in list

### Search & Filter
- [ ] Go to Transactions
- [ ] Type in search box
- [ ] Results filter
- [ ] Tap category chip
- [ ] List filters by category

### Charts
- [ ] Check Dashboard pie chart
- [ ] Check Reports pie chart
- [ ] Check Reports bar chart
- [ ] All display data

---

## 🐛 Common Issues & Solutions

### Issue: "npm start" fails
**Solution:**
```bash
npm install
npm start
```

### Issue: QR code doesn't work
**Solution:**
- Make sure phone and computer are on same WiFi
- Or tap "w" to open in web browser

### Issue: Can't see theme toggle
**Solution:**
- Look at top-right corner of screen
- Should be next to settings icon
- Try scrolling to top

### Issue: No seed data showing
**Solution:**
- Close app completely
- Reopen it
- Data loads on first launch

### Issue: Dark mode doesn't save
**Solution:**
- Check AsyncStorage permissions
- Try switching a few times
- Restart app

---

## 📱 Best Testing Experience

### Recommended:
1. **Use real phone** (better than emulator)
2. **Install Expo Go** app
3. **Scan QR code**
4. **Test all features**
5. **Try dark mode**
6. **Close and reopen** to test persistence

### Testing Dark Mode:
- Test in bright room (see light mode)
- Test in dark room (see dark mode benefit)
- Switch between both multiple times
- Check all 5 screens in both themes

---

## ✨ Expected Results

### On Launch:
1. App opens to Dashboard
2. Header shows profile and icons
3. Seed data displays
4. Everything loads smoothly

### After Testing:
✅ All screens work
✅ Dark mode toggles
✅ Data displays correctly
✅ Navigation smooth
✅ Forms work
✅ Charts show data
✅ Theme persists

---

## 🎉 Success Criteria

You know it's working when:
- ✅ You can toggle dark/light mode
- ✅ Profile picture shows at top
- ✅ Seed data appears everywhere
- ✅ All tabs navigate correctly
- ✅ Forms can add new data
- ✅ Charts display information
- ✅ Theme persists after restart

---

## 📞 Test Checklist

Complete this checklist:

- [ ] App starts successfully
- [ ] Header shows with profile
- [ ] Theme toggle visible
- [ ] Can switch to dark mode
- [ ] Can switch to light mode
- [ ] Dashboard shows all cards
- [ ] Seed data visible
- [ ] Can add new expense
- [ ] Can add new income
- [ ] Charts display data
- [ ] Navigation works
- [ ] Theme persists after restart

**All checked? Perfect! 🎉**

---

## 🚀 Ready to Go!

Your PaisaTrack Nepal app is ready with:
- ✅ Complete UI matching Figma
- ✅ Working dark/light mode
- ✅ Profile at top right
- ✅ Seed data loaded
- ✅ All features functional

**Just run `npm start` and test it!** 📱✨
