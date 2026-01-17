import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {TransactionType, FilterOptions} from '../types';
import {getCategories} from '../utils/helpers';
import {TYPE_FILTER_OPTIONS, FILTER_TYPES} from '../constants';

interface FilterSectionProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  allCategories: string[];
}

export const FilterSection: React.FC<FilterSectionProps> = React.memo(({
  filters,
  onFilterChange,
  allCategories,
}) => {
  const categoryOptions = [FILTER_TYPES.ALL, ...allCategories];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
          {TYPE_FILTER_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.chip,
                filters.type === option.value && styles.chipActive,
              ]}
              onPress={() => onFilterChange({...filters, type: option.value})}>
              <Text
                style={[
                  styles.chipText,
                  filters.type === option.value && styles.chipTextActive,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
          {categoryOptions.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.chip,
                filters.category === category && styles.chipActive,
              ]}
              onPress={() =>
                onFilterChange({
                  ...filters,
                  category: category === FILTER_TYPES.ALL ? undefined : category,
                })
              }>
              <Text
                style={[
                  styles.chipText,
                  filters.category === category && styles.chipTextActive,
                ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {(filters.type !== FILTER_TYPES.ALL || filters.category) && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onFilterChange({type: FILTER_TYPES.ALL})}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginLeft: 16,
    marginBottom: 8,
  },
  scroll: {
    paddingLeft: 16,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  clearButton: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

