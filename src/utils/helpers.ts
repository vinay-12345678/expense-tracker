import {Transaction, Balance} from '../types';
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  TRANSACTION_TYPES,
} from '../constants';

/**
 * Format date to DD-MM-YYYY
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Parse DD-MM-YYYY string to Date
 */
export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Calculate balance from transactions
 */
export const calculateBalance = (transactions: Transaction[]): Balance => {
  const totalIncome = transactions
    .filter(t => t.type === TRANSACTION_TYPES.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};


// Formats a number as a currency string with Indian Rupee symbol and thousand separators.
// E.g., 12345.678 => "₹12,345.68"
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get predefined categories
 */
export const getCategories = (type: 'income' | 'expense'): string[] => {
  if (type === TRANSACTION_TYPES.INCOME) {
    return [...INCOME_CATEGORIES];
  }
  return [...EXPENSE_CATEGORIES];
};

