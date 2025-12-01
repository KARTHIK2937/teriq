import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HelperTextProps {
  children: React.ReactNode;
}

const HelperText: React.FC<HelperTextProps> = ({ children }) => {
  return <Text style={styles.helperText}>{children}</Text>;
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});

export default HelperText;
