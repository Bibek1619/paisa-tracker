// Add Expense Modal Component

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Expense, ExpenseCategory, PaymentMethod } from '../../types';
import { generateId, getTodayString } from '../../utils/helpers';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
} from '../../constants/theme';
import {
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
  QUICK_AMOUNTS,
} from '../../constants/data';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(getTodayString());

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const expense: Expense = {
      id: generateId(),
      amount: parseFloat(amount),
      category,
      paymentMethod,
      note,
      date,
      createdAt: getTodayString(),
    };

    onSave(expense);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount('');
    setCategory('Food');
    setPaymentMethod('Cash');
    setNote('');
    setDate(getTodayString());
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Expense</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={COLORS.gray[700]} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Amount Input */}
            <View style={styles.section}>
              <Text style={styles.label}>Amount *</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor={COLORS.gray[400]}
              />
              <View style={styles.quickAmounts}>
                {QUICK_AMOUNTS.map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={styles.quickButton}
                    onPress={() => handleQuickAmount(value)}
                  >
                    <Text style={styles.quickButtonText}>Rs.{value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.optionsGrid}>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.optionButton,
                      category === cat && styles.optionButtonActive,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        category === cat && styles.optionTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={styles.label}>Payment Method *</Text>
              <View style={styles.optionsGrid}>
                {PAYMENT_METHODS.map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[
                      styles.optionButton,
                      paymentMethod === method && styles.optionButtonActive,
                    ]}
                    onPress={() => setPaymentMethod(method)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        paymentMethod === method && styles.optionTextActive,
                      ]}
                    >
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Note */}
            <View style={styles.section}>
              <Text style={styles.label}>Note (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a note..."
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                placeholderTextColor={COLORS.gray[400]}
              />
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Expense</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '90%',
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: SPACING.sm,
  },
  amountInput: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  quickButton: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  quickButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
    fontWeight: '600',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  optionButton: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
    fontWeight: '500',
  },
  optionTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.gray[100],
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[900],
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
