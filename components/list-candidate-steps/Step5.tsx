import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import { getCities } from '../../services/cities';
import Heading from '../ui/Heading';
import { InputDropdown } from '../ui/InputDropdown';
import { InputField } from '../ui/InputField';
import { SubHeader } from '../ui/SubHeader';
import { Step5Props } from './types';
import RadioButton from '../ui/RadioButton';
import { ErrorText } from '../ui/ErrorText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Step5 = ({ formData, handleChange, errors, isSuccess }: Step5Props) => {
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      if (formData && formData.country && formData.ownerRegionProvince) {
        const cityData = await getCities(formData.country, formData.ownerRegionProvince);
        if (cityData && cityData.cities) {
          setCities(cityData.cities.map((city: any) => ({ label: city.name, value: city.id })));
        }
      }
    };

    fetchCities();
  }, [formData]);

  const handleConsentChange = () => {
    const newConsentValue = formData.consent1 === 'true' ? 'false' : 'true';
    handleChange('consent1', newConsentValue);
  };

  const handleConsent2Change = () => {
    const newConsentValue = formData.consent2 === 'true' ? 'false' : 'true';
    handleChange('consent2', newConsentValue);
  };

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle-outline" size={100} color="green" />
        <Text style={styles.successText}>Candidate Listed Successfully!</Text>
        <Button title="Go to Dashboard" onPress={() => router.push('/dashboard')} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Heading>Landlord Details</Heading>
      <SubHeader>City/Town</SubHeader>
      <InputDropdown
        label="Select a city"
        items={cities}
        selectedValue={formData.ownerCityTown}
        onValueChange={(value) => handleChange('ownerCityTown', value)}
      />
      <SubHeader>Door/Plot Number</SubHeader>
      <InputField
        placeholder="Door/Plot Number"
        value={formData.ownerDoorPlotNumber}
        onChangeText={(text) => handleChange('ownerDoorPlotNumber', text)}
      />
      <SubHeader>Building/Sub-Building</SubHeader>
      <InputField
        placeholder="Building/Sub-Building"
        value={formData.ownerBuilding}
        onChangeText={(text) => handleChange('ownerBuilding', text)}
      />
      <SubHeader>Street Address</SubHeader>
      <InputField
        placeholder="Street Address"
        value={formData.ownerStreetAddress}
        onChangeText={(text) => handleChange('ownerStreetAddress', text)}
      />
      <SubHeader>Locality/Town Post Code</SubHeader>
      <InputField
        placeholder="Locality/Town Post Code"
        value={formData.postCode}
        onChangeText={(text) => handleChange('postCode', text)}
      />
      <SubHeader>District</SubHeader>
      <InputField
        placeholder="District"
        value={formData.district}
        onChangeText={(text) => handleChange('district', text)}
      />
      <SubHeader>PIN/Zipcode</SubHeader>
      <InputField
        placeholder="PIN/Zipcode"
        value={formData.pinZip}
        onChangeText={(text) => handleChange('pinZip', text)}
      />
      <View style={styles.consentContainer}>
        <RadioButton
          selected={formData.consent1 === 'true'}
          onPress={handleConsentChange}
          label="I hereby give my consent to Towerbuddy/its employees to present the uploaded documents for further verification processes, without which I understand the property/site will not be approved."
        />
        {errors.consent1 && <ErrorText message={errors.consent1} />}
        <RadioButton
          selected={formData.consent2 === 'true'}
          onPress={handleConsent2Change}
          label="By submitting the form, I hereby understand that documents submitted will be accessed by Towerbuddy authorized legal consultants for the same to be verified and approved."
        />
        {errors.consent2 && <ErrorText message={errors.consent2} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  consentContainer: {
    marginTop: 20,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Step5;
