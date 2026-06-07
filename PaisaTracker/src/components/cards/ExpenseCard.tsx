import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
      </View>
      <Text style={styles.description}>{expense.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(expense.date)}</Text>
        <Text style={styles.method}>{expense.paymentMethod}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  method: {
    fontSize: 12,
    color: '#10B981',
  },
});

export default ExpenseCard;
