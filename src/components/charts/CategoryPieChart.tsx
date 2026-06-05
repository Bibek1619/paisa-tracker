// Category Pie Chart Component

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { CategoryBreakdown } from '../../types';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';

interface CategoryPieChartProps {
  data: CategoryBreakdown[];
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No expense data available</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    amount: item.amount,
    color: item.color,
    legendFontColor: COLORS.gray[700],
    legendFontSize: FONT_SIZES.sm,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense by Category</Text>
      <PieChart
        data={chartData}
        width={screenWidth - SPACING.md * 4}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.gray[900],
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[500],
  },
});
