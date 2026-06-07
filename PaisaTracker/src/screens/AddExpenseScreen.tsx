import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Expense');
  const [amount, setAmount] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState('Rent');
  const [selectedIncomeSource, setSelectedIncomeSource] = useState('Salary');
  const [selectedPayment, setSelectedPayment] = useState('eSewa');
  const [date, setDate] = useState('10/27/2023');
  const [notes, setNotes] = useState('');

  const expenseCategories = [
    { id: 'Food', icon: 'food', label: 'Food' },
    { id: 'Transport', icon: 'car', label: 'Transport' },
    { id: 'Rent', icon: 'home', label: 'Rent' },
    { id: 'Shopping', icon: 'shopping', label: 'Shopping' },
    { id: 'Education', icon: 'school', label: 'Education' },
    { id: 'Health', icon: 'medical-bag', label: 'Health' },
    { id: 'Entertainment', icon: 'movie', label: 'Entertainment' },
    { id: 'Recharge', icon: 'cellphone', label: 'Recharge' },
    { id: 'Internet', icon: 'wifi', label: 'Internet' },
    { id: 'Others', icon: 'dots-horizontal', label: 'Others' },
  ];

  const incomeSources = [
    { id: 'Salary', icon: 'badge-account', label: 'Salary' },
    { id: 'Freelance', icon: 'laptop', label: 'Freelance' },
    { id: 'Business', icon: 'store', label: 'Business' },
    { id: 'Gift', icon: 'gift', label: 'Gift' },
    { id: 'Other', icon: 'dots-horizontal', label: 'Other' },
  ];

  const paymentMethods = [
    { id: 'Cash', icon: 'cash', label: 'Cash', color: '#6B7280' },
    { id: 'eSewa', icon: 'wallet', label: 'eSewa', color: '#10B981' },
    { id: 'Khalti', icon: 'wallet-outline', label: 'Khalti', color: '#8B5CF6' },
    { id: 'Bank Transfer', icon: 'bank-transfer', label: 'Bank Transfer', color: '#F59E0B' },
  ];

  const quickAmounts = [100, 500, 1000];

  const addQuickAmount = (value: number) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + value).toFixed(2));
  };

  const handleSave = () => {
    if (amount === '0' || !amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }
    Alert.alert('Success', `${activeTab} saved successfully!`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#2563EB" />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Expense' && styles.tabActive]}
            onPress={() => setActiveTab('Expense')}
          >
            <Text style={[styles.tabText, activeTab === 'Expense' && styles.tabTextActive]}>
              Add Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Income' && styles.tabActive]}
            onPress={() => setActiveTab('Income')}
          >
            <Text style={[styles.tabText, activeTab === 'Income' && styles.tabTextActive]}>
              Add Income
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Income Banner (only for Income tab) */}
        {activeTab === 'Income' && (
          <View style={styles.incomeBanner}>
            <Text style={styles.bannerLabel}>BALANCE INCREASE</Text>
            <Text style={styles.bannerTitle}>Boost Your Savings</Text>
          </View>
        )}

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.label}>
            {activeTab === 'Expense' ? 'Total Amount (Rs.)' : 'Transaction Amount'}
          </Text>
          <View style={styles.amountCard}>
            <Text style={styles.currencySymbol}>Rs.</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#CBD5E1"
            />
          </View>
          
          {/* Quick Amount Buttons - only for Expense */}
          {activeTab === 'Expense' && (
            <View style={styles.quickAmounts}>
              {quickAmounts.map((value) => (
                <TouchableOpacity
                  key={value}
                  style={styles.quickAmountButton}
                  onPress={() => addQuickAmount(value)}
                >
                  <Text style={styles.quickAmountText}>+{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Category/Income Source Section */}
        <View style={styles.section}>
          <Text style={styles.label}>
            {activeTab === 'Expense' ? 'Select Category' : 'Income Source'}
          </Text>
          <View style={styles.categoryGrid}>
            {(activeTab === 'Expense' ? expenseCategories : incomeSources).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryButton,
                  (activeTab === 'Expense' ? selectedCategory : selectedIncomeSource) === item.id && 
                    styles.categoryButtonActive,
                ]}
                onPress={() => {
                  if (activeTab === 'Expense') {
                    setSelectedCategory(item.id);
                  } else {
                    setSelectedIncomeSource(item.id);
                  }
                }}
              >
                <View style={[
                  styles.categoryIcon,
                  (activeTab === 'Expense' ? selectedCategory : selectedIncomeSource) === item.id && 
                    styles.categoryIconActive,
                ]}>
                  <Icon
                    name={item.icon}
                    size={24}
                    color={(activeTab === 'Expense' ? selectedCategory : selectedIncomeSource) === item.id 
                      ? '#fff' 
                      : '#6B7280'}
                  />
                </View>
                <Text style={[
                  styles.categoryLabel,
                  (activeTab === 'Expense' ? selectedCategory : selectedIncomeSource) === item.id && 
                    styles.categoryLabelActive,
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.dateInput}>
            <Icon name="calendar" size={20} color="#6B7280" style={styles.dateIcon} />
            <TextInput
              style={styles.dateText}
              value={date}
              onChangeText={setDate}
              placeholder="MM/DD/YYYY"
            />
            <Icon name="chevron-down" size={20} color="#6B7280" />
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentMethodsRow}>
            {paymentMethods.slice(0, 3).map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentChip,
                  selectedPayment === method.id && styles.paymentChipActive,
                  selectedPayment === method.id && { backgroundColor: method.color },
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <Icon
                  name={method.icon}
                  size={18}
                  color={selectedPayment === method.id ? '#fff' : '#6B7280'}
                />
                <Text style={[
                  styles.paymentChipText,
                  selectedPayment === method.id && styles.paymentChipTextActive,
                ]}>
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder={activeTab === 'Income' 
              ? "Add a description or receipt details..." 
              : "Add notes here..."}
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name={activeTab === 'Income' ? 'bank' : 'content-save'} size={20} color="#fff" />
          <Text style={styles.saveButtonText}>
            {activeTab === 'Income' ? 'Save Income' : 'Save Expense'}
          </Text>
        </TouchableOpacity>

        {/* Security Note (Income only) */}
        {activeTab === 'Income' && (
          <View style={styles.securityNote}>
            <View style={styles.securityIcon}>
              <Icon name="bank" size={32} color="#2563EB" />
            </View>
            <View style={styles.securityText}>
              <Text style={styles.securityTitle}>Secure Records</Text>
              <Text style={styles.securityDesc}>
                All income records are locally encrypted for your privacy and security.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  helpButton: {
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
  incomeBanner: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bannerLabel: {
    fontSize: 11,
    color: '#DBEAFE',
    marginBottom: 8,
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  amountCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563EB',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1F2937',
    padding: 0,
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  quickAmountButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    width: '22%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  categoryButtonActive: {
    backgroundColor: '#EFF6FF',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: '#2563EB',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  paymentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  paymentChipActive: {
    backgroundColor: '#10B981',
  },
  paymentChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  paymentChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 100,
  },
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    gap: 16,
  },
  securityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default AddExpenseScreen;
