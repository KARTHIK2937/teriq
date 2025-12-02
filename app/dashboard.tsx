import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InfoBlock } from '../components/InfoBlock';
import { SideDrawer } from '../components/SideDrawer';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/theme';
import { useDashboard } from '../hooks/useDashboard';

// A simple inline SVG for the hamburger icon
const HamburgerIcon = () => (
  <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
  </View>
);

export default function DashboardScreen() {
  const [userName, setUserName] = useState('');
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { dashboardData, loading, error } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.user) {
            setUserName(userData.user.first_name || 'User');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data from storage', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Welcome, {userName}!</Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <HamburgerIcon />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>

        {loading && <ActivityIndicator size="large" color={Colors.light.darkBlue} />}
        {error && <Text>{error}</Text>}
        {dashboardData && (
          <>
            <InfoBlock title="Total Sites" value={String(dashboardData.total_candidates)} />
            <InfoBlock
              title="Sites live on network"
              value={String(dashboardData.live_candidates)}
            />
            <InfoBlock title="Vacant Sites" value={String(dashboardData.vacant_candidates)} />
          </>
        )}
        <View style={styles.buttonRow}>
          <Button
            style={styles.button}
            title="Candidate List"
            onPress={() => router.push('/candidate-list')}
          />
          <Button
            style={styles.button}
            title="+ List a Candidate"
            onPress={() => router.push('/listcandidate')}
          />
        </View>
      </ScrollView>
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
  welcomeMessage: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.white,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.darkBlue,
    width: '90%',
    marginTop: 20, // Added margin top
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    width: '48%',
  },
});