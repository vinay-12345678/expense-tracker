import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Transaction, TransactionType} from '../types';
import {generateId, formatDate, getCategories} from '../utils/helpers';
import {DEFAULT_TRANSACTION_TYPE} from '../constants';

interface AddTransactionFormProps {
  onAdd: (transaction: Transaction) => void;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({onAdd}) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(DEFAULT_TRANSACTION_TYPE);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const categories = getCategories(type);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    const selectedCategory = showCustomCategory ? customCategory : category;
    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select or enter a category');
      return;
    }

    const now = new Date();
    const transaction: Transaction = {
      id: generateId(),
      amount: numAmount,
      category: selectedCategory,
      type,
      date: now.toISOString(),
      timestamp: now.getTime(),
    };

    onAdd(transaction);

    setAmount('');
    setCategory('');
    setCustomCategory('');
    setShowCustomCategory(false);

    Alert.alert('Success', 'Transaction added successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'income' && styles.typeButtonIncome]}
            onPress={() => {
              setType('income');
              setCategory('');
              setShowCustomCategory(false);
            }}>
            <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'expense' && styles.typeButtonExpense]}
            onPress={() => {
              setType('expense');
              setCategory('');
              setShowCustomCategory(false);
            }}>
            <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#94A3B8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        {!showCustomCategory ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => setCategory(cat)}>
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.categoryTextActive,
                    ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => setShowCustomCategory(true)}>
              <Text style={styles.customButtonText}>+ Custom Category</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter custom category"
              value={customCategory}
              onChangeText={setCustomCategory}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                setShowCustomCategory(false);
                setCustomCategory('');
              }}>
              <Text style={styles.customButtonText}>← Back to Categories</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  typeButtonIncome: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  typeButtonExpense: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  customButton: {
    paddingVertical: 8,
  },
  customButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

