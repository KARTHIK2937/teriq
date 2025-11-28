import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '../constants/theme';

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isVisible, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await AsyncStorage.removeItem('userData');
    router.replace('/login');
    onClose(); // Close the drawer after logging out
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <SafeAreaView style={styles.drawerContainer}>
              <Image 
                source={require('@/assets/images/icon.png')} 
                style={styles.logo}
              />
              <Text style={styles.drawerHeader}>Menu</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
              {/* Other drawer items can be added here */}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end', // This pushes the drawer to the right
  },
  drawerContainer: {
    width: '70%',
    height: '100%',
    backgroundColor: Colors.light.white,
    paddingTop: 40, // Adjust as needed for status bar
    paddingHorizontal: 20,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 }, // Shadow on the left
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  drawerHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', // Center the header text
    color: Colors.light.softBlack,
  },
  logoutButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.light.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
