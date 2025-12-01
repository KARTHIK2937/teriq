import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface InputDropdownProps {
  label: string;
  items: { label: string; value: string; }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const InputDropdown: React.FC<InputDropdownProps> = ({ label, items, selectedValue, onValueChange, disabled }) => {
    const containerStyle = [
        styles.inputContainer,
        disabled && styles.disabledContainer,
      ];

  return (
      <View style={containerStyle}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            if (onValueChange) {
              onValueChange(itemValue);
            }
          }}
          enabled={!disabled}
        >
          <Picker.Item label={label} value="" style={{color: '#999'}} />
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} style={styles.pickerItem} />
          ))}
        </Picker>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      marginBottom: 15,
      width: '100%',
    },
    pickerItem: {
      color: '#0A2540',
      fontSize: 16,
    },
    disabledContainer: {
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
    },
  });
