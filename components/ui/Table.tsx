import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Colors } from '../../constants/theme';

interface Column {
  header: string;
  accessor: string;
  width?: number;
}

interface DataItem {
  [key: string]: any;
}

interface TableProps {
  data: DataItem[];
  columns: Column[];
  onNext: () => void;
  onPrevious: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
}

const Table: React.FC<TableProps> = ({ 
  data, 
  columns, 
  onNext, 
  onPrevious, 
  hasNextPage, 
  hasPreviousPage, 
  currentPage, 
  totalPages 
}) => {
  const router = useRouter();

  const handlePress = (item: DataItem) => {
    router.push({ pathname: '/candidate-details', params: { id: item.id } });
  };

  return (
    <>
      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              {columns.map((column, index) => (
                <Text key={index} style={[styles.headerCell, { width: column.width || 150 }]}>
                  {column.header}
                </Text>
              ))}
            </View>
            {data.map((item, rowIndex) => (
              <TouchableOpacity key={rowIndex} onPress={() => handlePress(item)}>
                <View style={styles.row}>
                  {columns.map((column, colIndex) => (
                    <Text 
                      key={colIndex} 
                      style={[
                        styles.cell, 
                        { width: column.width || 150 }, 
                        column.accessor === 'candidateId' && styles.candidateIdCell
                      ]}
                    >
                      {item[column.accessor]}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={onPrevious} disabled={!hasPreviousPage}>
          <Text style={[styles.paginationText, !hasPreviousPage && styles.disabled]}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>{`Page ${currentPage} of ${totalPages}`}</Text>
        <TouchableOpacity onPress={onNext} disabled={!hasNextPage}>
          <Text style={[styles.paginationText, !hasNextPage && styles.disabled]}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.light.white,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerCell: {
    padding: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.light.softBlack,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cell: {
    padding: 12,
    textAlign: 'center',
    color: Colors.light.softBlack,
  },
  candidateIdCell: {
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: Colors.light.white,
  },
  paginationText: {
    color: Colors.light.darkBlue,
  },
  disabled: {
    color: '#ccc',
  },
});

export default Table;
