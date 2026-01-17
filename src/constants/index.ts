import {FilterOptions, TransactionType} from '../types';

export const TRANSACTION_TYPES = {
  INCOME: 'income' as TransactionType,
  EXPENSE: 'expense' as TransactionType,
} as const;

export const FILTER_TYPES = {
  ALL: 'all',
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
] as const;

export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other',
] as const;

export const DEFAULT_FILTERS: FilterOptions = {
  type: 'all',
};

export const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
} as const;

export const DEFAULT_TRANSACTION_TYPE: TransactionType = TRANSACTION_TYPES.EXPENSE;

export const TYPE_FILTER_OPTIONS = [
  {label: 'All', value: FILTER_TYPES.ALL},
  {label: 'Income', value: FILTER_TYPES.INCOME},
  {label: 'Expense', value: FILTER_TYPES.EXPENSE},
] as const;

