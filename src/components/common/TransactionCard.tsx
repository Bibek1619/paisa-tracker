// Reusable Transaction Card Component

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Expense, Income } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/helpers';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  PAYMENT_METHOD_ICONS,
  INCOME_SOURCE_ICONS,
} from '../../constants/theme';

interface TransactionCardProps {
  transaction: Expense | Income;
  type: 'expense' | 'income';
  onPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  type,
  onPress,
}) => {
  const isExpense = type === 'expense';
  const expense = isExpense ? (transaction as Expense) : null;
  const income = !isExpense ? (transaction as Income) : null;

  const icon = isExpense
    ? CATEGORY_ICONS[expense?.category || ''] || 'ellipse'
    : INCOME_SOURCE_ICONS[income?.source || ''] || 'cash';

  const color = isExpense
    ? CATEGORY_COLORS[expense?.category || '']
    : COLORS.success;

  const paymentIcon = expense
    ? PAYMENT_METHOD_ICONS[expense.paymentMethod]
    : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.category}>
            {isExpense ? expense?.category : income?.source}
          </Text>
          <Text style={[styles.amount, { color: isExpense ? COLORS.danger : COLORS.success }]}>
            {isExpense ? '-' : '+'} {formatCurrency(transaction.amount)}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.detailsRow}>
            {paymentIcon && (
              <>
                <Ionicons
                  name={paymentIcon as any}
                  size={14}
                  color={COLORS.gray[500]}
                />
                <Text style={styles.detail}>{expense?.paymentMethod}</Text>
                <Text style={styles.separator}>•</Text>
              </>
            )}
            <Ionicons name="calendar" size={14} color={COLORS.gray[500]} />
            <Text style={styles.detail}>{formatShortDate(transaction.date)}</Text>
          </View>
        </View>

        {transaction.note && (
          <Text style={styles.note} numberOfLines={1}>
            {transaction.note}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  amount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[600],
    marginLeft: SPACING.xs,
  },
  separator: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[400],
    marginHorizontal: SPACING.xs,
  },
  note: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
});
