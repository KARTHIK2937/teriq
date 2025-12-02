import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getAllocatedNominals = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/realestate/nominals/allocated/?limit=200`, {
        headers: {
         'Authorization': `Token ${token}`
     }
   });
   if (!response.ok) {
       throw new Error('Failed to fetch allocated nominals');
   }
   const data = await response.json();
   return data;
  } catch (error) {
    console.error('Failed to fetch allocated nominals:', error);
    throw error;
  }
};
