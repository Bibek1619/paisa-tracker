import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BudgetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Management</Text>
      <Text style={styles.emptyText}>Set your monthly budgets here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
});

export default BudgetScreen;
