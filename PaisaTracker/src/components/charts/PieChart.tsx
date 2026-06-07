import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Chart will appear here</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}: NPR {item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  placeholder: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
  },
});

export default PieChart;
