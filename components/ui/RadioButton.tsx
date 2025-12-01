import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '../../hooks/use-theme-color';
import HelperText from './HelperText';

type RadioButtonProps = {
  selected: boolean;
  onPress: () => void;
  label: string;
};

export default function RadioButton({ selected, onPress, label }: RadioButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.radio, { borderColor: selected ? primaryColor : borderColor }]}>
        {selected && <View style={[styles.radioSelected, { backgroundColor: primaryColor }]} />}
      </View>
      <HelperText>{label}</HelperText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
