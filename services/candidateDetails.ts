import * as SecureStore from 'expo-secure-store';
import { getBaseUrl } from './api';

export const getCandidateDetails = async (candidateId: string) => {
  const baseUrl = getBaseUrl();
  const token = await SecureStore.getItemAsync('userToken');

  if (!token) {
    throw new Error('Token not found');
  }
  
  console.log("1111111111",candidateId)
  const response = await fetch(`${baseUrl}/realestate/site/${candidateId}/details/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  });
console.log("2222222222",response)
  if (!response.ok) {
    throw new Error('Failed to fetch candidate details');
  }

  const data = await response.json();
  return data;
};
