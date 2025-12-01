
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';

const queryClient = new QueryClient();

export const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="listcandidate" options={{ headerShown: false }} />
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
