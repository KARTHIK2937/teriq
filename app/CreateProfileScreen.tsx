
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SideDrawer } from '../components/SideDrawer';
import { Colors } from '../constants/theme';

// A simple inline SVG for the hamburger icon
const HamburgerIcon = () => (
  <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
  </View>
);

export default function CreateProfileScreen() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Profile</Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <HamburgerIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text>Create Profile Screen Content</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
