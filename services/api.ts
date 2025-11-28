import AsyncStorage from '@react-native-async-storage/async-storage';

let BASE_URL = '';

export const initializeApi = async () => {
  try {
    const countryCode = await AsyncStorage.getItem('countryCode');
    if (countryCode) {
      BASE_URL = `https://${countryCode}.towerbuddy.tel:8000/api/v2`;
      console.log(`BASE_URL set to: ${BASE_URL}`);
    } else {
      console.error('Country code not found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error initializing BASE_URL:', error);
  }
};

export const getBaseUrl = () => {
    if (!BASE_URL) {
        console.warn("BASE_URL has not been initialized. Please call initializeApi() first.");
    }
    return BASE_URL;
};
