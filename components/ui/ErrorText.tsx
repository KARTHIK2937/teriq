import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ErrorTextProps {
  message: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    width: '100%',
    marginTop: -8,
    marginBottom: 8,
  },
});
