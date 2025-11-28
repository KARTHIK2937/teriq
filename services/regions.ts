import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getRegions = async (countryId: string) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/regions/?country=${countryId}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch regions:', error);
    return null;
  }
};
