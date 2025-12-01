import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { getCities } from '../../services/cities';
import { getCountries } from '../../services/countries';
import { getRegions } from '../../services/regions';
import { ErrorText } from '../ui/ErrorText';
import Heading from '../ui/Heading';
import { InputDropdown } from '../ui/InputDropdown';
import { InputField } from '../ui/InputField';
import RadioButton from '../ui/RadioButton';
import { SubHeader } from '../ui/SubHeader';
import { Step1Props } from './types';

const Step1 = ({ formData, handleChange, userRole, candidateType, setCandidateType, countryId, errors }: Step1Props) => {
  const [regions, setRegions] = useState<{ label: string; value: string; }[]>([]);
  const [cities, setCities] = useState<{ label: string; value: string; }[]>([]);
  const [countries, setCountries] = useState<{ label: string; value: string; }[]>([]);
  const [ownerRegions, setOwnerRegions] = useState<{ label: string; value: string; }[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (countryId) {
        const regionData = await getRegions(countryId);
        if (regionData && regionData.regions) {
          const regionOptions = regionData.regions.map((region: { name: string; id: string; }) => ({
            label: region.name,
            value: region.id,
          }));
          setRegions(regionOptions);
        }
      }
    };

    fetchRegions();
  }, [countryId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (countryId && formData.regionProvince) {
        const cityData = await getCities(countryId, formData.regionProvince);
        if (cityData && cityData.cities) {
          const cityOptions = cityData.cities.map((city: { name: string; id: string; }) => ({
            label: city.name,
            value: city.id,
          }));
          setCities(cityOptions);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [countryId, formData.regionProvince]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countryData = await getCountries();
      if (countryData && countryData.countries) {
        const countryOptions = countryData.countries.map((country: { name: string; id: string; }) => ({
          label: country.name,
          value: country.id,
        }));
        setCountries(countryOptions);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchOwnerRegions = async () => {
      if (formData.country) {
        const regionData = await getRegions(formData.country);
        if (regionData && regionData.regions) {
          const regionOptions = regionData.regions.map((region: { name: string; id: string; }) => ({
            label: region.name,
            value: region.id,
          }));
          setOwnerRegions(regionOptions);
        }
      }
    };

    fetchOwnerRegions();
  }, [formData.country]);

  const handleRegionChange = (value: string) => {
    handleChange('regionProvince', value);
    handleChange('cityTown', '');
  };
  
  const handleConsentChange = () => {
    const newConsentValue = formData.consent === 'true' ? 'false' : 'true';
    handleChange('consent', newConsentValue);
  };

  const candidateTypeOptions = [
    { label: 'Independent', value: 'independent' },
    { label: 'Allocated Nominal', value: 'allocated' },
  ];

  const allocatedNominalOptions = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
  ];

  const propertyTypeOptions = [
    { label: 'Vacant land', value: 'L' },
    { label: 'Commercial building', value: 'C' },
    { label: 'Residential building', value: 'R' },
  ];

  const landlordOfferingOptions = [
    { label: 'Rooftop', value: 'R' },
    { label: 'Sidewall', value: 'W' },
    { label: 'Apartment', value: 'A' },
    { label: 'Not Applicable', value: 'N' },
  ];

  const siteRegistrationStatusOptions = [
    { label: 'Registered', value: 'R' },
    { label: 'Not Registered', value: 'NR' },
  ];

  const siteElectricConnectionOptions = [
    { label: 'Yes', value: 'Y' },
    { label: 'No', value: 'N' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Heading>Candidate Detail</Heading>
      {userRole === 'A' && (
        <>
          <SubHeader isRequired>Candidate Type</SubHeader>
          <InputDropdown
            label="Select Candidate Type"
            items={candidateTypeOptions}
            selectedValue={candidateType}
            onValueChange={(value) => setCandidateType(value)}
          />
          <RadioButton
            selected={formData.consent === 'true'}
            onPress={handleConsentChange}
            label="Give consent to onboard the site on behalf of a landlord."
          />
          {errors.consent && <ErrorText message={errors.consent} />}
          {candidateType === 'allocated' && (
            <>
              <SubHeader isRequired>Allocated Nominal</SubHeader>
              <InputDropdown
                label="Allocated nominal"
                items={allocatedNominalOptions}
                selectedValue={formData.allocatedNominal}
                onValueChange={(value) => handleChange('allocatedNominal', value)}
              />
              {errors.allocatedNominal && <ErrorText message={errors.allocatedNominal} />}
            </>
          )}
        </>
      )}
       <View style={{ marginTop: 20 }}>
        <Heading>Site Geographical Location</Heading>
      </View>
      <SubHeader isRequired>Latitude</SubHeader>
      <InputField
        placeholder="Latitude"
        value={formData.latitude}
        onChangeText={(text) => handleChange('latitude', text)}
      />
      {errors.latitude && <ErrorText message={errors.latitude} />}
      <SubHeader isRequired>Longitude</SubHeader>
      <InputField
        placeholder="Longitude"
        value={formData.longitude}
        onChangeText={(text) => handleChange('longitude', text)}
      />
      {errors.longitude && <ErrorText message={errors.longitude} />}
        <View style={{ marginTop: 20 }}>
        <Heading>Site Details</Heading>
      </View>
      <SubHeader isRequired>Region/Province</SubHeader>
      <InputDropdown
        label="Select Region/Province"
        items={regions}
        selectedValue={formData.regionProvince}
        onValueChange={handleRegionChange}
      />
      {errors.regionProvince && <ErrorText message={errors.regionProvince} />}
      <SubHeader isRequired>City/Town</SubHeader>
      <InputDropdown
        label="Select City/Town"
        items={cities}
        selectedValue={formData.cityTown}
        onValueChange={(value) => handleChange('cityTown', value)}
        disabled={!formData.regionProvince}
      />
      {errors.cityTown && <ErrorText message={errors.cityTown} />}
      <SubHeader isRequired>Pin/Zipcode</SubHeader>
      <InputField
        placeholder="Pin/Zipcode"
        value={formData.zipcode}
        onChangeText={(text) => handleChange('zipcode', text)}
      />
      {errors.zipcode && <ErrorText message={errors.zipcode} />}
      <SubHeader isRequired>Property Type</SubHeader>
      <InputDropdown
        label="Select Property Type"
        items={propertyTypeOptions}
        selectedValue={formData.propertyType}
        onValueChange={(value) => handleChange('propertyType', value)}
      />
      {errors.propertyType && <ErrorText message={errors.propertyType} />}

      {(formData.propertyType === 'C' || formData.propertyType === 'R') && (
        <>
          <SubHeader isRequired>Property Offering</SubHeader>
          <InputDropdown
            label="Select Property Offering"
            items={landlordOfferingOptions}
            selectedValue={formData.landlordOffering}
            onValueChange={(value) => handleChange('landlordOffering', value)}
          />
          {errors.landlordOffering && <ErrorText message={errors.landlordOffering} />}
        </>
      )}
      <SubHeader isRequired>Site Registration Status</SubHeader>
      <InputDropdown
        label="Select Site Registration Status"
        items={siteRegistrationStatusOptions}
        selectedValue={formData.siteRegistrationStatus}
        onValueChange={(value) => handleChange('siteRegistrationStatus', value)}
      />
      {errors.siteRegistrationStatus && <ErrorText message={errors.siteRegistrationStatus} />}
      <SubHeader isRequired>Electricity Connection</SubHeader>
      <InputDropdown
        label="Select Electricity Connection"
        items={siteElectricConnectionOptions}
        selectedValue={formData.siteElectricConnection}
        onValueChange={(value) => handleChange('siteElectricConnection', value)}
      />
      {errors.siteElectricConnection && <ErrorText message={errors.siteElectricConnection} />}
      <View style={{ marginTop: 20 }}>
        <Heading>Landlord Details</Heading>
      </View>
      <SubHeader isRequired>Landlord's first name</SubHeader>
      <InputField
        placeholder="Landlord's first name"
        value={formData.ownerFirstName}
        onChangeText={(text) => handleChange('ownerFirstName', text)}
      />
      {errors.ownerFirstName && <ErrorText message={errors.ownerFirstName} />}
      <SubHeader isRequired>Landlord's last name</SubHeader>
      <InputField
        placeholder="Landlord's last name"
        value={formData.ownerLastName}
        onChangeText={(text) => handleChange('ownerLastName', text)}
      />
      {errors.ownerLastName && <ErrorText message={errors.ownerLastName} />}
      <SubHeader isRequired>Landlord's email</SubHeader>
      <InputField
        placeholder="Landlord's email"
        value={formData.ownerEmail}
        onChangeText={(text) => handleChange('ownerEmail', text)}
      />
      {errors.ownerEmail && <ErrorText message={errors.ownerEmail} />}
      <SubHeader isRequired>Landlord's phone number</SubHeader>
      <InputField
        placeholder="Landlord's phone number"
        value={formData.ownerNumber}
        onChangeText={(text) => handleChange('ownerNumber', text)}
      />
      {errors.ownerNumber && <ErrorText message={errors.ownerNumber} />}
      <SubHeader isRequired>Country</SubHeader>
      <InputDropdown
        label="Select Country"
        items={countries}
        selectedValue={formData.country}
        onValueChange={(value) => handleChange('country', value)}
      />
      {errors.country && <ErrorText message={errors.country} />}
      <SubHeader isRequired>Region/Province</SubHeader>
      <InputDropdown
        label="Select Region/Province"
        items={ownerRegions}
        selectedValue={formData.ownerRegionProvince}
        onValueChange={(value) => handleChange('ownerRegionProvince', value)}
        disabled={!formData.country}
      />
      {errors.ownerRegionProvince && <ErrorText message={errors.ownerRegionProvince} />}
    </ScrollView>
  );
};

export default Step1;
