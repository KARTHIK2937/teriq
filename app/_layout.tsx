
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';

const queryClient = new QueryClient();

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="listcandidate"
        options={{
          headerShown: false,
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
