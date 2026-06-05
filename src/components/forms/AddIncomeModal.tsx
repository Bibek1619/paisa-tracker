// Add Income Modal Component

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
import { Income, IncomeSource } from '../../types';
import { generateId, getTodayString } from '../../utils/helpers';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
} from '../../constants/theme';
import { INCOME_SOURCES } from '../../constants/data';

interface AddIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (income: Income) => void;
}

export const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<IncomeSource>('Salary');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(getTodayString());

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const income: Income = {
      id: generateId(),
      amount: parseFloat(amount),
      source,
      note,
      date,
      createdAt: getTodayString(),
    };

    onSave(income);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount('');
    setSource('Salary');
    setNote('');
    setDate(getTodayString());
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Income</Text>
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
            </View>

            {/* Source Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>Source *</Text>
              <View style={styles.optionsGrid}>
                {INCOME_SOURCES.map((src) => (
                  <TouchableOpacity
                    key={src}
                    style={[
                      styles.optionButton,
                      source === src && styles.optionButtonActive,
                    ]}
                    onPress={() => setSource(src)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        source === src && styles.optionTextActive,
                      ]}
                    >
                      {src}
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
            <Text style={styles.saveButtonText}>Save Income</Text>
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
    maxHeight: '80%',
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
    color: COLORS.success,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.success,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
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
    backgroundColor: COLORS.success + '20',
    borderColor: COLORS.success,
  },
  optionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[700],
    fontWeight: '500',
  },
  optionTextActive: {
    color: COLORS.success,
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
    backgroundColor: COLORS.success,
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
