import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  BalanceCard,
  TransactionItem,
  AddTransactionForm,
  FilterSection,
} from './src/components';
import {useTransactions, useFilteredTransactions} from './src/hooks/useTransactions';
import {calculateBalance} from './src/utils/helpers';
import {FilterOptions, Transaction} from './src/types';
import {DEFAULT_FILTERS} from './src/constants';

function App(): React.JSX.Element {
  const {transactions, loading, addTransaction, deleteTransaction, clearAll} =
    useTransactions();

  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredTransactions = useFilteredTransactions(transactions, filters);

  const balance = useMemo(
    () => calculateBalance(transactions),
    [transactions],
  );

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    transactions.forEach(t => cats.add(t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  const handleDeleteTransaction = (id: string) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(id),
        },
      ],
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Transactions',
      'Are you sure you want to delete all transactions? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearAll,
        },
      ],
    );
  };

  const handleAddTransaction = (transaction: Transaction) => {
    addTransaction(transaction);
    setShowAddForm(false);
  };

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Tracker</Text>
        {transactions.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <BalanceCard balance={balance} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(!showAddForm)}>
        <Text style={styles.addButtonText}>
          {showAddForm ? '− Close Form' : '+ Add Transaction'}
        </Text>
      </TouchableOpacity>

      {showAddForm && <AddTransactionForm onAdd={handleAddTransaction} />}

      {transactions.length > 0 && (
        <>
          <FilterSection
            filters={filters}
            onFilterChange={setFilters}
            allCategories={allCategories}
          />

          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              Transactions ({filteredTransactions.length})
            </Text>
          </View>
        </>
      )}
    </>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions yet</Text>
      <Text style={styles.emptySubtext}>
        Add your first transaction to get started!
      </Text>
    </View>
  );

  const renderItem = ({item}: {item: Transaction}) => (
    <TransactionItem transaction={item} onDelete={handleDeleteTransaction} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <FlatList
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={(item,index) => item?.id || index.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          transactions.length === 0 ? renderEmptyComponent : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  clearAllText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default App;
