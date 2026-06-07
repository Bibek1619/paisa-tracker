import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
          </View>
          <Text style={styles.headerTitle}>PaisaTrack Nepal</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog-outline" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Title with Date */}
        <View style={styles.titleRow}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <View style={styles.dateChip}>
            <Icon name="calendar-blank" size={16} color="#6B7280" />
            <Text style={styles.dateText}>Aug 2024</Text>
          </View>
        </View>

        {/* Monthly Budget Card */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetContent}>
            <Text style={styles.budgetLabel}>Monthly Budget</Text>
            <Text style={styles.budgetAmount}>Rs. 30,000</Text>
          </View>
          <View style={styles.budgetIcon}>
            <Icon name="wallet-outline" size={32} color="#2563EB" />
          </View>
        </View>

        {/* Spent and Remaining Cards */}
        <View style={styles.row}>
          <View style={[styles.smallCard, styles.spentCard]}>
            <Text style={styles.smallCardLabel}>Spent</Text>
            <Text style={styles.smallCardAmount}>Rs. 18,500</Text>
            <View style={[styles.progressBar, { backgroundColor: '#EF4444' }]} />
          </View>
          <View style={[styles.smallCard, styles.remainingCard]}>
            <Text style={styles.smallCardLabel}>Remaining</Text>
            <Text style={styles.smallCardAmount}>Rs. 11,500</Text>
            <View style={[styles.progressBar, { backgroundColor: '#10B981' }]} />
          </View>
        </View>

        {/* Today's Expense */}
        <View style={styles.todayCard}>
          <View style={styles.todayLeft}>
            <View style={styles.todayIcon}>
              <Icon name="calendar-today" size={24} color="#2563EB" />
            </View>
            <View>
              <Text style={styles.todayLabel}>TODAY'S EXPENSE</Text>
              <Text style={styles.todayAmount}>Rs. 350</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Details</Text>
            <Icon name="chevron-right" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Category Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Breakdown</Text>
          <View style={styles.chartContainer}>
            {/* Donut Chart Placeholder */}
            <View style={styles.donutChart}>
              <View style={[styles.donutSegment, { backgroundColor: '#2563EB', width: 120, height: 120, borderRadius: 60 }]} />
              <View style={[styles.donutSegment, { backgroundColor: '#10B981', width: 120, height: 120, borderRadius: 60, position: 'absolute' }]} />
              <View style={[styles.donutSegment, { backgroundColor: '#F59E0B', width: 120, height: 120, borderRadius: 60, position: 'absolute' }]} />
              <View style={styles.donutHole} />
            </View>
            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText}>Food</Text>
                <Text style={styles.legendPercent}>40%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Rent</Text>
                <Text style={styles.legendPercent}>25%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.legendText}>Others</Text>
                <Text style={styles.legendPercent}>35%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spending Trend */}
        <View style={styles.card}>
          <View style={styles.trendHeader}>
            <Text style={styles.cardTitle}>Spending Trend</Text>
            <Text style={styles.trendChange}>+12% vs last month</Text>
          </View>
          <View style={styles.trendChart}>
            <View style={styles.trendLine} />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Add' as never)}
      >
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  budgetContent: {
    flex: 1,
  },
  budgetLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  budgetAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  budgetIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  smallCard: {
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
  spentCard: {},
  remainingCard: {},
  smallCardLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  smallCardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '60%',
  },
  todayCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  todayLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  todayAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donutChart: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  donutSegment: {},
  donutHole: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  legend: {
    flex: 1,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
  legendPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  trendChart: {
    height: 80,
    justifyContent: 'flex-end',
  },
  trendLine: {
    height: 60,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#2563EB',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default DashboardScreen;
