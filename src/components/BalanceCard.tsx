import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Balance} from '../types';
import {formatCurrency} from '../utils/helpers';

interface BalanceCardProps {
  balance: Balance;
}

export const BalanceCard: React.FC<BalanceCardProps> = React.memo(({balance}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainBalance}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={[styles.amount, styles.balanceAmount]}>
          {formatCurrency(balance.balance)}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.amount, styles.income]}>
            {formatCurrency(balance.totalIncome)}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Expenses</Text>
          <Text style={[styles.amount, styles.expense]}>
            {formatCurrency(balance.totalExpenses)}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainBalance: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  label: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
    fontWeight: '500',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  balanceAmount: {
    color: '#F8FAFC',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  income: {
    color: '#10B981',
  },
  expense: {
    color: '#EF4444',
  },
});

