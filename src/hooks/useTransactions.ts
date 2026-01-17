import {useState, useEffect, useCallback} from 'react';
import {Transaction, FilterOptions} from '../types';
import {storageUtils} from '../utils/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = () => {
      setLoading(true);
      const stored = storageUtils.getTransactions();
      setTransactions(stored);
      setLoading(false);
    };
    loadTransactions();
  }, []);

  const addTransaction = useCallback((transaction: Transaction) => {
    storageUtils.addTransaction(transaction);
    setTransactions(prev => [transaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    storageUtils.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    storageUtils.clearAllTransactions();
    setTransactions([]);
  }, []);

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    clearAll,
  };
};

export const useFilteredTransactions = (
  transactions: Transaction[],
  filters: FilterOptions,
) => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  useEffect(() => {
    let filtered = [...transactions];

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    if (filters.minAmount !== undefined) {
      filtered = filtered.filter(t => t.amount >= filters.minAmount!);
    }
    if (filters.maxAmount !== undefined) {
      filtered = filtered.filter(t => t.amount <= filters.maxAmount!);
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  return filteredTransactions;
};

