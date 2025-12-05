
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';

const queryClient = new QueryClient();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      const isLoginPage = segments[0] === 'login';

      if (token) {
        if (isLoginPage) {
          router.replace('/dashboard');
        }
      } else {
        if (!isLoginPage) {
          router.replace('/login');
        }
      }
    };

    checkAuth();
  }, [segments]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="listcandidate"
        options={{
          headerShown: true,
          title: 'List a Candidate',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="CreateProfileScreen"
        options={{
          headerShown: true,
          title: 'Create Profile',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="candidate-details"
        options={{
          headerShown: true,
          title: 'Candidate Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InitialLayout />
    </QueryClientProvider>
  );
};

export default RootLayout;
