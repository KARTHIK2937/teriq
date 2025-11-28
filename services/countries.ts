
import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getCountries = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/countries/`, {
        headers: {
         'Authorization': `Token ${token}`
       }
     });
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return null;
  }
};
