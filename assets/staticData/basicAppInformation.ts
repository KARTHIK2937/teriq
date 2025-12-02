import AsyncStorage from '@react-native-async-storage/async-storage';

//This file send information about the country's lat and lng (for maps) ,base_url (to get regions and respective cities data) and other country specific place holders

const information = {
  location: {lat: 0, long: 0},
  mobile_number_code: '+00',
  country_code: 0,
  base_url: 'http://ken.towerbuddy.tel:8000/api/v2/', //defaulted to ken (wont be using default tho...just as a failsafe)
  country: 'Unknown',
};

// helper function to update the exported object in-place
export async function updateInformation() {
  try {
    const storedCountry = await AsyncStorage.getItem('countryCode');
    console.log('Country coming to Information:', storedCountry);

    const countryCode = storedCountry || 'ind';
    // For India(ind)
    if (countryCode === 'ind') {
      information.location = {lat: 20.5937, long: 78.9629};
      information.mobile_number_code = '+91';
      information.country_code = 1269750;
      information.base_url = 'http://ind.towerbuddy.tel:8000/api/v2/';
      information.country = 'India';
    }
    // For Kenya(ken)
    else if (countryCode === 'ken') {
      information.location = {lat: -0.0236, long: 37.9062};
      information.mobile_number_code = '+254';
      information.country_code = 192950;
      information.base_url = 'http://ken.towerbuddy.tel:8000/api/v2/';
      information.country = 'Kenya';
    }
    // For Zambia(zmb)
    else if (countryCode === 'zmb') {
      information.location = {lat: -15.416667, long: 28.283333};
      information.mobile_number_code = '+260';
      information.country_code = 895949;
      information.base_url = 'https://zmb.towerbuddy.tel:8000/api/v2/';
      information.country = 'Zambia';
    }
    // For South Sudan(ssd)
    else if (countryCode === 'ssd') {
      information.location = {
        lat: 7.8627,
        long: 29.6949,
      };
      information.mobile_number_code = '+211';
      information.country_code = 7909807;
      information.base_url = 'https://ssd.towerbuddy.tel:8000/api/v2/';
      information.country = 'South Sudan';
    }
    // For Democratic Republic of Congo(cod)
    else if (countryCode === 'cod') {
      information.location = {lat: -4.0383, long: 21.7587};
      information.mobile_number_code = '+243';
      information.country_code = 203312;
      information.base_url = 'https://cod.towerbuddy.tel:8000/api/v2/';
      information.country = 'Democratic Republic of Congo';
    }
    // For Uganda(uga)
    else if (countryCode === 'uga') {
      information.location = {lat: -15.416667, long: 28.283333};
      information.mobile_number_code = '+256';
      information.country_code = 226074;
      information.base_url = 'https://uga.towerbuddy.tel:8000/api/v2/';
      information.country = 'Uganda';
    }
    // For Nigeria(nga)
    else if (countryCode === 'nga') {
      information.location = {lat: 9.0765, long: 7.3986};
      information.mobile_number_code = '+234';
      information.country_code = 2328926;
      information.base_url = 'https://nga.towerbuddy.tel:8000/api/v2/';
      information.country = 'Nigeria'; //add the rest later
    }
    // For Ethiopia(eth)
    else if (countryCode === 'eth') {
      information.location = {lat: 9.0192, long: 38.7525};
      information.mobile_number_code = '+251';
      information.country_code = 337996;
      information.base_url = 'https://eth.towerbuddy.tel:8000/api/v2/';
      information.country = 'Ethiopia'; //add the rest later
    } else {
      information.location = {lat: 0, long: 0};
      information.mobile_number_code = '+00';
      information.country_code = 0;
      information.base_url = `http://${countryCode}.towerbuddy.tel:8000/api/v2/`;
      information.country = countryCode.toUpperCase();
    }

    console.log('Information updated:', information);
  } catch (error) {
    console.error('Error updating information:', error);
  }
}

export default information;
