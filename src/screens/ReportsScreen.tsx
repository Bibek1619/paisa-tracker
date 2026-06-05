// Reports Screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../hooks/useExpenses';
import { useIncome } from '../hooks/useIncome';
import { useBudgets } from '../hooks/useBudgets';
import { StatsCard } from '../components/common/StatsCard';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { MonthlyBarChart } from '../components/charts/MonthlyBarChart';
import {
  calculateMonthlyStats,
  getCurrentMonth,
  getCurrentYear,
  formatCurrency,
  calculatePercentage,
} from '../utils/helpers';
import {
  calculateCategoryBreakdown,
  calculateMonthlyTrends,
  calculateAverageDailyExpense,
  getHighestSpendingCategory,
  generateInsights,
} from '../services/analyticsService';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

export const ReportsScreen = () => {
  const { expenses } = useExpenses();
  const { income } = useIncome();
  const { budgets } = useBudgets();

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  const stats = calculateMonthlyStats(expenses, income, budgets, currentMonth, currentYear);
  const categoryBreakdown = calculateCategoryBreakdown(expenses, currentMonth, currentYear);
  const monthlyTrends = calculateMonthlyTrends(expenses, income);
  const avgDaily = calculateAverageDailyExpense(expenses, currentMonth, currentYear);
  const highestCategory = getHighestSpendingCategory(expenses, currentMonth, currentYear);
  const insights = generateInsights(expenses, income, budgets, currentMonth, currentYear);

  const savingsRate =
    stats.totalIncome > 0
      ? calculatePercentage(stats.netSavings, stats.totalIncome)
      : 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reports & Analytics</Text>
          <Text style={styles.subtitle}>Monthly financial insights</Text>
        </View>

        {/* Monthly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Income</Text>
              <Text style={[styles.summaryValue, { color: COLORS.success }]}>
                {formatCurrency(stats.totalIncome)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Expense</Text>
              <Text style={[styles.summaryValue, { color: COLORS.danger }]}>
                {formatCurrency(stats.totalExpense)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowBorder]}>
              <Text style={styles.summaryLabelBold}>Net Savings</Text>
              <Text
                style={[
                  styles.summaryValueBold,
                  { color: stats.netSavings >= 0 ? COLORS.success : COLORS.danger },
                ]}
              >
                {formatCurrency(stats.netSavings)}
              </Text>
            </View>
          </View>
        </View>

        {/* Analytics Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <StatsCard
                title="Highest Category"
                value={highestCategory?.category || 'N/A'}
                icon="trending-up"
                iconColor={COLORS.warning}
                subtitle={highestCategory ? formatCurrency(highestCategory.amount) : ''}
              />
            </View>
            <View style={styles.metricItem}>
              <StatsCard
                title="Avg Daily Expense"
                value={formatCurrency(avgDaily)}
                icon="calendar"
                iconColor={COLORS.primary}
              />
            </View>
            <View style={styles.metricItem}>
              <StatsCard
                title="Savings Rate"
                value={`${savingsRate}%`}
                icon="wallet"
                iconColor={savingsRate > 20 ? COLORS.success : COLORS.warning}
                subtitle="Of income"
              />
            </View>
          </View>
        </View>

        {/* Charts */}
        {categoryBreakdown.length > 0 && (
          <View style={styles.section}>
            <CategoryPieChart data={categoryBreakdown} />
          </View>
        )}

        {monthlyTrends.length > 0 && (
          <View style={styles.section}>
            <MonthlyBarChart data={monthlyTrends} />
          </View>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insights</Text>
            {insights.map((insight) => (
              <View
                key={insight.id}
                style={[
                  styles.insightCard,
                  {
                    borderLeftColor:
                      insight.type === 'success'
                        ? COLORS.success
                        : insight.type === 'warning'
                        ? COLORS.warning
                        : COLORS.primary,
                  },
                ]}
              >
                <Ionicons
                  name={insight.icon as any}
                  size={24}
                  color={
                    insight.type === 'success'
                      ? COLORS.success
                      : insight.type === 'warning'
                      ? COLORS.warning
                      : COLORS.primary
                  }
                />
                <Text style={styles.insightText}>{insight.message}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginTop: SPACING.xs,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: SPACING.md,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  summaryRowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    marginTop: SPACING.sm,
    paddingTop: SPACING.md,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
  },
  summaryLabelBold: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.gray[900],
  },
  summaryValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  summaryValueBold: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  metricItem: {
    width: '47%',
  },
  insightCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  insightText: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
    lineHeight: 20,
  },
});
