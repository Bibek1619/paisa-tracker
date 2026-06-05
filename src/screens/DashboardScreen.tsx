// Dashboard Screen - Updated to match Figma design

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../hooks/useExpenses';
import { useIncome } from '../hooks/useIncome';
import { useBudgets } from '../hooks/useBudgets';
import { useThemedColors } from '../hooks/useThemedColors';
import { AppHeader } from '../components/common/AppHeader';
import { StatsCard } from '../components/common/StatsCard';
import { TransactionCard } from '../components/common/TransactionCard';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { AddExpenseModal } from '../components/forms/AddExpenseModal';
import {
  calculateMonthlyStats,
  getCurrentMonth,
  getCurrentYear,
  formatCurrency,
  sortByDate,
  isCurrentMonth,
} from '../utils/helpers';
import { calculateCategoryBreakdown } from '../services/analyticsService';
import { SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

export const DashboardScreen = () => {
  const COLORS = useThemedColors();
  const { expenses, addExpense, refreshExpenses } = useExpenses();
  const { income, refreshIncome } = useIncome();
  const { budgets, refreshBudgets } = useBudgets();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  const stats = calculateMonthlyStats(
    expenses,
    income,
    budgets,
    currentMonth,
    currentYear
  );

  const todayExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    const today = new Date();
    return expDate.toDateString() === today.toDateString();
  });

  const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const recentTransactions = sortByDate(
    expenses.filter((exp) => isCurrentMonth(exp.date))
  ).slice(0, 5);

  const categoryBreakdown = calculateCategoryBreakdown(
    expenses,
    currentMonth,
    currentYear
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshExpenses(), refreshIncome(), refreshBudgets()]);
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header with Profile and Theme Toggle */}
      <AppHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Title and Date */}
        <View style={styles.titleSection}>
          <Text style={[styles.screenTitle, { color: COLORS.text }]}>Dashboard</Text>
          <View style={styles.dateChip}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
            <Text style={[styles.dateText, { color: COLORS.textSecondary }]}>
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </Text>
          </View>
        </View>

        {/* Monthly Budget Card */}
        <View style={[styles.budgetCard, { backgroundColor: COLORS.white }]}>
          <Text style={[styles.budgetLabel, { color: COLORS.textSecondary }]}>
            Monthly Budget
          </Text>
          <Text style={[styles.budgetAmount, { color: COLORS.primary }]}>
            {formatCurrency(stats.remainingBudget + stats.totalExpense)}
          </Text>
        </View>

        {/* Spent and Remaining Cards */}
        <View style={styles.twoColumnRow}>
          <View style={[styles.miniCard, { backgroundColor: COLORS.white }]}>
            <Text style={[styles.miniCardLabel, { color: COLORS.textSecondary }]}>
              Spent
            </Text>
            <Text style={[styles.miniCardAmount, { color: COLORS.danger }]}>
              {formatCurrency(stats.totalExpense)}
            </Text>
            <View style={[styles.progressLine, { backgroundColor: COLORS.danger }]} />
          </View>

          <View style={[styles.miniCard, { backgroundColor: COLORS.white }]}>
            <Text style={[styles.miniCardLabel, { color: COLORS.textSecondary }]}>
              Remaining
            </Text>
            <Text style={[styles.miniCardAmount, { color: COLORS.success }]}>
              {formatCurrency(stats.remainingBudget)}
            </Text>
            <View style={[styles.progressLine, { backgroundColor: COLORS.success }]} />
          </View>
        </View>

        {/* Today's Expense Card */}
        <View style={[styles.todayCard, { backgroundColor: COLORS.white }]}>
          <View style={styles.todayHeader}>
            <View style={[styles.todayIcon, { backgroundColor: COLORS.primary + '20' }]}>
              <Ionicons name="wallet" size={20} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.todayLabel, { color: COLORS.textSecondary }]}>
                TODAY'S EXPENSE
              </Text>
              <Text style={[styles.todayAmount, { color: COLORS.text }]}>
                {formatCurrency(todayTotal)}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={[styles.detailsLink, { color: COLORS.primary }]}>
                Details →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Breakdown */}
        {categoryBreakdown.length > 0 && (
          <View style={styles.section}>
            <CategoryPieChart data={categoryBreakdown} />
          </View>
        )}

        {/* Spending Trend - Placeholder */}
        <View style={[styles.trendCard, { backgroundColor: COLORS.white }]}>
          <View style={styles.trendHeader}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Spending Trend
            </Text>
            <Text style={[styles.trendChange, { color: COLORS.success }]}>
              +12% vs last month
            </Text>
          </View>
          {/* Placeholder for line chart - you can add react-native-chart-kit line chart here */}
          <View style={styles.chartPlaceholder}>
            <Text style={[styles.placeholderText, { color: COLORS.textSecondary }]}>
              Weekly trend chart will appear here
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: COLORS.primary }]}
        onPress={() => setShowAddExpense(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Expense Modal */}
      <AddExpenseModal
        visible={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSave={addExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  screenTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  dateText: {
    fontSize: FONT_SIZES.sm,
  },
  budgetCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  budgetLabel: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  twoColumnRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  miniCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  miniCardLabel: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  miniCardAmount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  progressLine: {
    height: 4,
    width: '50%',
    borderRadius: 2,
  },
  todayCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  todayLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    marginBottom: 4,
  },
  todayAmount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  detailsLink: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  trendCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  trendChange: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  chartPlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: BORDER_RADIUS.md,
  },
  placeholderText: {
    fontSize: FONT_SIZES.sm,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.xl + 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
