
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InputDocumentProps {
  label: string;
  onValueChange: (value: string) => void;
  value?: string | null;
}

const InputDocument: React.FC<InputDocumentProps> = ({ label, onValueChange, value }) => {

  const getPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera and media library permissions to make this work!');
      return false;
    }
    return true;
  };

  const pickDocument = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onValueChange(uri);
    }
  };

  const takePicture = async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onValueChange(uri);
    }
  };

  const handlePress = () => {
    Alert.alert(
      'Select Document',
      'Choose an option to upload your document.',
      [
        { text: 'Choose from Library', onPress: pickDocument },
        { text: 'Take Photo', onPress: takePicture },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.inputContainer}>
        <Text style={styles.inputText} numberOfLines={1} ellipsizeMode="tail">
          {value ? value.split('/').pop() : label}
        </Text>
        <Ionicons name="camera" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
});

export default InputDocument;
