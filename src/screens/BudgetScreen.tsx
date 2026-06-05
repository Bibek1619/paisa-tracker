// Budget Screen

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudgets } from '../hooks/useBudgets';
import { useExpenses } from '../hooks/useExpenses';
import { BudgetProgressCard } from '../components/common/BudgetProgressCard';
import { Budget, ExpenseCategory } from '../types';
import { generateId, getCurrentMonth, getCurrentYear, filterByMonth } from '../utils/helpers';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';
import { EXPENSE_CATEGORIES } from '../constants/data';

export const BudgetScreen = () => {
  const { budgets, addOrUpdateBudget, removeBudget } = useBudgets();
  const { expenses } = useExpenses();
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [category, setCategory] = useState<ExpenseCategory | 'overall'>('overall');
  const [amount, setAmount] = useState('');

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  // Calculate current spent for each budget
  const budgetsWithSpent = budgets
    .filter((b) => b.month === currentMonth && b.year === currentYear)
    .map((budget) => {
      if (budget.category === 'overall') {
        const monthlyExpenses = filterByMonth(expenses, currentMonth, currentYear);
        const totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        return { ...budget, currentSpent: totalSpent };
      } else {
        const categoryExpenses = filterByMonth(expenses, currentMonth, currentYear).filter(
          (exp) => exp.category === budget.category
        );
        const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        return { ...budget, currentSpent: totalSpent };
      }
    });

  const handleSaveBudget = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const budget: Budget = {
      id: generateId(),
      category,
      limitAmount: parseFloat(amount),
      currentSpent: 0,
      month: currentMonth,
      year: currentYear,
    };

    addOrUpdateBudget(budget);
    setAmount('');
    setCategory('overall');
    setShowAddBudget(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Budget</Text>
          <Text style={styles.subtitle}>Manage your spending limits</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddBudget(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Budget List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {budgetsWithSpent.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={64} color={COLORS.gray[400]} />
            <Text style={styles.emptyText}>No budgets set</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to set your first budget
            </Text>
          </View>
        ) : (
          budgetsWithSpent.map((budget) => (
            <BudgetProgressCard key={budget.id} budget={budget} />
          ))
        )}
      </ScrollView>

      {/* Add Budget Modal */}
      <Modal visible={showAddBudget} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Budget</Text>
              <TouchableOpacity onPress={() => setShowAddBudget(false)}>
                <Ionicons name="close" size={28} color={COLORS.gray[700]} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    category === 'overall' && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategory('overall')}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === 'overall' && styles.categoryTextActive,
                    ]}
                  >
                    Overall Budget
                  </Text>
                </TouchableOpacity>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      category === cat && styles.categoryButtonActive,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === cat && styles.categoryTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Monthly Limit</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor={COLORS.gray[400]}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
              <Text style={styles.saveButtonText}>Save Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 3,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '80%',
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
  },
  modalContent: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryButton: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.gray[100],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[900],
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
