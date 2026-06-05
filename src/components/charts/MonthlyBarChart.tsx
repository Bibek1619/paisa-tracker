// Monthly Bar Chart Component

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { MonthlyTrend } from '../../types';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';

interface MonthlyBarChartProps {
  data: MonthlyTrend[];
  title?: string;
}

export const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({
  data,
  title = 'Last 6 Months Trend',
}) => {
  const screenWidth = Dimensions.get('window').width;

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No trend data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        data: data.map((item) => item.expense),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <BarChart
        data={chartData}
        width={screenWidth - SPACING.md * 4}
        height={220}
        yAxisLabel="Rs."
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: COLORS.white,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
          style: {
            borderRadius: BORDER_RADIUS.md,
          },
          propsForLabels: {
            fontSize: FONT_SIZES.xs,
          },
        }}
        style={styles.chart}
        showValuesOnTopOfBars
        fromZero
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
  chart: {
    marginVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
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
