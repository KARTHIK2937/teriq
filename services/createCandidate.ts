import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const createCandidate = async (formDataToSend: FormData) => {
  console.log('Sending data to API:', formDataToSend);
  try {
    const token = await SecureStore.getItemAsync('userToken');
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/realestate/sites/add/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(errorData.message || 'Failed to create candidate');
    }

    const data = await response.json();
    console.log('API Success Response:', data);
    return data;
  } catch (error) {
    console.error('Error in createCandidate service:', error);
    throw error;
  }
};
