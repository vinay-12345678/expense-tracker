export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // ISO string format
  timestamp: number;
}

export interface Balance {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface FilterOptions {
  type?: TransactionType | 'all';
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}

