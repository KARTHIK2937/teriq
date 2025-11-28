import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token);
      } catch (e) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) {
      // Still checking auth status
      return;
    }

    const inDashboardGroup = segments[0] === 'dashboard';

    if (isLoggedIn && !inDashboardGroup) {
        // Logged in, but not in the main app yet, so redirect
        router.replace('/dashboard');
    } else if (!isLoggedIn) {
        // Not logged in, so redirect to the login page
        router.replace('/login');
    }
  }, [isLoggedIn]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return <InitialLayout />;
}
