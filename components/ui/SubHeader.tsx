
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface SubHeaderProps {
  children: React.ReactNode;
  isRequired?: boolean;
}

export const SubHeader: React.FC<SubHeaderProps> = ({ children, isRequired }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>{children}</Text>
      {isRequired && <Text style={styles.asterisk}>*</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.darkBlue,
  },
  asterisk: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
});
