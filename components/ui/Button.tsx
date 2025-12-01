import { Text, TouchableOpacity, StyleSheet, type TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00B4D8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#F4F7FA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
