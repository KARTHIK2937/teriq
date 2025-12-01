import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry} 
        value={value}
        onChangeText={onChangeText}
      />
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
  input: {
    padding: 15,
    fontSize: 16,
  },
});
