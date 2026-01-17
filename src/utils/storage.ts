import {createMMKV} from 'react-native-mmkv';
import {Transaction} from '../types';
import {STORAGE_KEYS} from '../constants';

export const storage = createMMKV();

const TRANSACTIONS_KEY = STORAGE_KEYS.TRANSACTIONS;

export const storageUtils = {
  // Get all transactions
  getTransactions: (): Transaction[] => {
    try {
      const data = storage.getString(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  // Save transactions
  saveTransactions: (transactions: Transaction[]): void => {
    try {
      storage.set(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  },

  // Add a single transaction
  addTransaction: (transaction: Transaction): void => {
    try {
      const transactions = storageUtils.getTransactions();
      transactions.unshift(transaction); // Add to beginning
      storageUtils.saveTransactions(transactions);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  },

  // Delete a transaction
  deleteTransaction: (id: string): void => {
    try {
      const transactions = storageUtils.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      storageUtils.saveTransactions(filtered);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  },

  // Clear all transactions
  clearAllTransactions: (): void => {
    try {
      storage.remove(TRANSACTIONS_KEY);
    } catch (error) {
      console.error('Error clearing transactions:', error);
    }
  },
};

