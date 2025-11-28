
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Heading;
