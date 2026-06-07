import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  const categoryData = [
    { id: 1, name: 'Food', icon: 'food', percentage: 28, amount: 10000, color: '#2563EB' },
    { id: 2, name: 'Transport', icon: 'car', percentage: 10, amount: 3500, color: '#10B981' },
    { id: 3, name: 'Shopping', icon: 'shopping', percentage: 14, amount: 5000, color: '#F59E0B' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.headerTitle}>PaisaTrack Nepal</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog-outline" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title and Period Toggle */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Financial Reports</Text>
          <View style={styles.periodToggle}>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'Monthly' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('Monthly')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'Monthly' && styles.periodTextActive]}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'Weekly' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('Weekly')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'Weekly' && styles.periodTextActive]}>
                Weekly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Savings Card */}
        <View style={styles.savingsCard}>
          <View style={styles.savingsContent}>
            <View style={styles.savingsLeft}>
              <View style={styles.greenLine} />
              <View>
                <Text style={styles.savingsLabel}>Total Savings</Text>
                <Text style={styles.savingsAmount}>Rs. 15,000</Text>
              </View>
            </View>
            <View style={styles.savingsIcon}>
              <Icon name="piggy-bank" size={32} color="#10B981" />
            </View>
          </View>
        </View>

        {/* Income and Expense Cards */}
        <View style={styles.row}>
          <View style={styles.incomeCard}>
            <Text style={styles.cardLabel}>INCOME</Text>
            <Text style={styles.incomeAmount}>Rs. 50,000</Text>
            <View style={styles.blueLine} />
          </View>
          <View style={styles.expenseCard}>
            <Text style={styles.cardLabel}>EXPENSE</Text>
            <Text style={styles.expenseAmount}>Rs. 35,000</Text>
            <View style={styles.redLine} />
          </View>
        </View>

        {/* Spending Mix */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>Spending Mix</Text>
            <TouchableOpacity>
              <Icon name="information-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Donut Chart */}
          <View style={styles.chartContainer}>
            <View style={styles.donutChart}>
              {/* This would be replaced with actual chart library */}
              <View style={styles.donutRing}>
                <View style={styles.donutCenter}>
                  <Text style={styles.donutLabel}>Expense</Text>
                  <Text style={styles.donutPercent}>70%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.legendText}>Food</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Transport</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>Shopping</Text>
            </View>
          </View>
        </View>

        {/* 6 Months Trend */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>6 Months Trend</Text>
            <View style={styles.trendIcon}>
              <Icon name="wallet" size={20} color="#fff" />
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.barChartContainer}>
            <View style={styles.barChart}>
              {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => (
                <View key={month} style={styles.barColumn}>
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: index === 5 ? '100%' : `${(index + 1) * 15}%`,
                          backgroundColor: index === 5 ? '#2563EB' : '#E5E7EB',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{month}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>

          {categoryData.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Icon name={category.icon} size={24} color={category.color} />
                </View>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPercent}>{category.percentage}% of total expense</Text>
                </View>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryAmount}>Rs. {category.amount.toLocaleString()}</Text>
                <View style={[styles.categoryBar, { backgroundColor: category.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Icon name="download" size={20} color="#fff" />
          <Text style={styles.downloadText}>Download Full Report</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: '#fff',
  },
  periodText: {
    fontSize: 14,
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  savingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  savingsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenLine: {
    width: 4,
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 2,
    marginRight: 16,
  },
  savingsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  savingsIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  incomeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expenseCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 12,
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 12,
  },
  blueLine: {
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
    width: '80%',
  },
  redLine: {
    height: 4,
    backgroundColor: '#EF4444',
    borderRadius: 2,
    width: '80%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  donutChart: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 30,
    borderColor: '#E5E7EB',
    borderTopColor: '#2563EB',
    borderRightColor: '#2563EB',
    borderBottomColor: '#10B981',
    borderLeftColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-90deg' }],
  },
  donutCenter: {
    transform: [{ rotate: '90deg' }],
    alignItems: 'center',
  },
  donutLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  donutPercent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  trendIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barChartContainer: {
    marginTop: 20,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 10,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryPercent: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryBar: {
    height: 4,
    width: 80,
    borderRadius: 2,
  },
  downloadButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  downloadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ReportsScreen;
