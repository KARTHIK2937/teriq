import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getCities = async (countryId: string, regionId: string) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/cities/?country=${countryId}&region=${regionId}`, {
        headers: {
          'Authorization': `Token ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    return null;
  }
};
