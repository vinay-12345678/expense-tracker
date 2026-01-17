# 💰 Expense Tracker

A modern, feature-rich Personal Expense Tracker built with React Native that helps users track their daily expenses and income with persistent storage.

## ✨ Features

### Core Features (MVP)
- **📊 Transaction List**: View all transactions with date (DD-MM-YYYY), category, amount, and type
- **➕ Add Transaction**: Easy-to-use form to add income/expense transactions
- **💵 Balance Summary**: Real-time display of total balance, income, and expenses
- **🔍 Transaction Filtering**: Filter by type, category, and amount range

### Bonus Features
- **💾 Data Persistence**: Uses MMKV for fast, efficient local storage
- **⚡ Performance Optimized**: FlatList with proper keyExtractor and memoization
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations
- **📱 Responsive Design**: Works seamlessly on all screen sizes

## 🏗️ Architecture & Best Practices

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── BalanceCard.tsx
│   ├── TransactionItem.tsx
│   ├── AddTransactionForm.tsx
│   ├── FilterSection.tsx
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── useTransactions.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
    ├── storage.ts      # MMKV storage utilities
    └── helpers.ts      # Helper functions
```

### Code Quality
✅ **TypeScript**: Full type safety throughout the app  
✅ **Component Separation**: Reusable, modular components  
✅ **Custom Hooks**: Clean state management with `useTransactions` and `useFilteredTransactions`  
✅ **Performance**: Memoized calculations and optimized FlatList rendering  
✅ **Clean Code**: Proper separation of concerns and well-named functions  

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and JDK

### Installation

1. **Navigate to project directory**:
   ```bash
   cd "/Users/vinaybansal/Documents/personal/ExpenseTracker"
   ```

2. **Dependencies are already installed**, but if you need to reinstall:
   ```bash
   npm install
   ```

### Running the App

#### Android
1. Start Metro bundler:
   ```bash
   npm start
   ```

2. In a new terminal, run:
   ```bash
   npm run android
   ```
   Make sure you have an Android emulator running or device connected.

#### iOS

**Note**: Due to the space in the workspace path, CocoaPods installation may have issues. Here are solutions:

**Option 1**: Install pods with proper environment variables
```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
cd ios
pod install
cd ..
```

**Option 2**: Move the project to a path without spaces
```bash
# Move to a simpler path
mv "/Users/vinaybansal/Documents/personal/ExpenseTracker" ~/ExpenseTracker
cd ~/ExpenseTracker
cd ios && pod install && cd ..
```

Then run:
```bash
npm start
# In another terminal
npm run ios
```

## 📦 Dependencies

### Main Dependencies
- **react-native**: 0.83.1
- **react**: 19.2.0
- **react-native-mmkv**: Fast key-value storage
- **react-native-safe-area-context**: Safe area handling

### Dev Dependencies
- TypeScript
- ESLint
- Jest for testing
- Prettier for code formatting

## 🎯 Features Breakdown

### 1. Transaction Management
- Add transactions with amount, category, and type
- Delete individual transactions
- Clear all transactions
- Persistent storage using MMKV

### 2. Smart Categorization
**Income Categories**: Salary, Freelance, Investment, Gift, Other  
**Expense Categories**: Food, Travel, Shopping, Bills, Entertainment, Health, Education, Other  
**Custom Categories**: Add your own categories on the fly

### 3. Powerful Filtering
- Filter by transaction type (Income/Expense/All)
- Filter by category
- Filter by amount range (future enhancement)
- Real-time filter updates

### 4. Balance Tracking
- Total Balance (Income - Expenses)
- Total Income
- Total Expenses
- Color-coded indicators (Green for income, Red for expenses)

## 🎨 UI Components

### BalanceCard
Displays financial summary with:
- Large, prominent total balance
- Separate income and expense cards
- Color-coded amounts

### TransactionItem
Shows individual transactions with:
- Category and date
- Amount with +/- indicator
- Delete button
- Color-coded indicator bar

### AddTransactionForm
User-friendly form featuring:
- Type selector (Income/Expense)
- Amount input with numeric keyboard
- Category chips with scroll
- Custom category option
- Form validation

### FilterSection
Intuitive filtering with:
- Horizontal scrollable chips
- Type and category filters
- Clear filters button
- Active filter highlighting

## 🔄 State Management

### Custom Hooks

**useTransactions**
- Manages transaction state
- Loads from MMKV on mount
- Provides add/delete/clear functions
- Automatic persistence

**useFilteredTransactions**
- Filters transactions based on criteria
- Memoized for performance
- Real-time updates

## ⚡ Performance Optimizations

1. **FlatList**: Efficient rendering of large lists
2. **keyExtractor**: Proper key extraction for list items
3. **useMemo**: Memoized balance calculations
4. **useCallback**: Optimized callback functions
5. **MMKV**: Fast native storage (10-30x faster than AsyncStorage)

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📝 Code Standards

- **ESLint**: Enforces code quality
- **TypeScript**: Type safety
- **Prettier**: Consistent formatting
- **Comments**: Clear, descriptive comments

## 🐛 Troubleshooting

### iOS Pod Install Issues
If you encounter encoding errors with pod install:
1. Set UTF-8 encoding: `export LANG=en_US.UTF-8`
2. Move project to a path without spaces
3. Try: `cd ios && pod deintegrate && pod install`

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build (after pod install)
cd ios && xcodebuild clean && cd ..
```

## 📄 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Author

Built with ❤️ following React Native best practices and clean code principles.

---

**Happy Expense Tracking! 🎉**
