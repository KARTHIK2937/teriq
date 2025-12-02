import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getDashboard = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const fetchUrl = `${baseUrl}/users/account/dashboard/`;

    const response = await fetch(fetchUrl, {
        headers: {
         'Authorization': `Token ${token}`
       }
    });
   if (!response.ok) {
       throw new Error('Failed to fetch dashboard data');
   }
   const data = await response.json();
   return data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};
