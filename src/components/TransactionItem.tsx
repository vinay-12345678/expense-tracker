import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Transaction} from '../types';
import {formatCurrency, formatDate} from '../utils/helpers';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = React.memo(({
  transaction,
  onDelete,
}) => {
  const isIncome = transaction.type === 'income';
  const date = new Date(transaction.date);

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, isIncome ? styles.incomeIndicator : styles.expenseIndicator]} />
      
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.category}>{transaction.category}</Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
            {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
          </Text>
          <TouchableOpacity
            onPress={() => onDelete(transaction.id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  indicator: {
    width: 4,
  },
  incomeIndicator: {
    backgroundColor: '#10B981',
  },
  expenseIndicator: {
    backgroundColor: '#EF4444',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#64748B',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  incomeText: {
    color: '#10B981',
  },
  expenseText: {
    color: '#EF4444',
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
});

