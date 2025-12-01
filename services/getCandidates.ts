import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getCandidates = async (url?: string) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const fetchUrl = url || `${baseUrl}/realestate/candidates/`;

    const response = await fetch(fetchUrl, {
        headers: {
         'Authorization': `Token ${token}`
     }
   });
   if (!response.ok) {
       throw new Error('Failed to fetch candidates');
   }
   const data = await response.json();
   return data;
  } catch (error) {
    console.error('Failed to fetch candidates:', error);
    throw error;
  }
};
