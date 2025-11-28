import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoBlockProps {
  title: string;
  value: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A2540',
  },
});
