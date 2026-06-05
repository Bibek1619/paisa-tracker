// Budget Progress Card Component

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Budget } from '../../types';
import { formatCurrency, calculatePercentage, getBudgetStatus } from '../../utils/helpers';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
} from '../../constants/theme';

interface BudgetProgressCardProps {
  budget: Budget;
}

export const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({ budget }) => {
  const percentage = calculatePercentage(budget.currentSpent, budget.limitAmount);
  const status = getBudgetStatus(budget.currentSpent, budget.limitAmount);
  const remaining = budget.limitAmount - budget.currentSpent;

  const statusColor =
    status === 'danger' ? COLORS.danger : status === 'warning' ? COLORS.warning : COLORS.success;

  const categoryColor = CATEGORY_COLORS[budget.category] || COLORS.gray[500];
  const icon = CATEGORY_ICONS[budget.category] || 'wallet';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
          <Ionicons name={icon as any} size={24} color={categoryColor} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.category}>{budget.category}</Text>
          <Text style={styles.amounts}>
            {formatCurrency(budget.currentSpent)} / {formatCurrency(budget.limitAmount)}
          </Text>
        </View>
        <Text style={[styles.percentage, { color: statusColor }]}>{percentage}%</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.remaining}>
          {remaining >= 0 ? 'Remaining:' : 'Exceeded:'} {formatCurrency(Math.abs(remaining))}
        </Text>
        {status === 'danger' && (
          <View style={styles.alert}>
            <Ionicons name="warning" size={14} color={COLORS.danger} />
            <Text style={styles.alertText}>Budget Exceeded!</Text>
          </View>
        )}
        {status === 'warning' && (
          <View style={styles.alert}>
            <Ionicons name="alert-circle" size={14} color={COLORS.warning} />
            <Text style={[styles.alertText, { color: COLORS.warning }]}>Almost Used!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  headerText: {
    flex: 1,
  },
  category: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[900],
    marginBottom: 4,
  },
  amounts: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
  percentage: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.gray[200],
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remaining: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.danger,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});
