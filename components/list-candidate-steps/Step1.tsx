import { useAllocatedNominals } from '@/hooks/useAllocatedNominals';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MapPressEvent, Region } from 'react-native-maps';
import information, { updateInformation } from '../../assets/staticData/basicAppInformation';
import { getCities } from '../../services/cities';
import { getCountries } from '../../services/countries';
import { getRegions } from '../../services/regions';
import { ErrorText } from '../ui/ErrorText';
import GoogleMap from '../ui/GoogleMap';
import Heading from '../ui/Heading';
import { InputDropdown } from '../ui/InputDropdown';
import { InputField } from '../ui/InputField';
import MapContainer from '../ui/MapContainer';
import RadioButton from '../ui/RadioButton';
import { SubHeader } from '../ui/SubHeader';
import { Step1Props } from './types';

interface MarkerData {
  latitude: number;
  longitude: number;
  color: 'blue' | 'green';
}

const Step1 = ({ formData, handleChange, userRole, candidateType, setCandidateType, countryId, errors }: Step1Props) => {
  const [regions, setRegions] = useState<{ label: string; value: string; }[]>([]);
  const [cities, setCities] = useState<{ label: string; value: string; }[]>([]);
  const [countries, setCountries] = useState<{ label: string; value: string; }[]>([]);
  const [ownerRegions, setOwnerRegions] = useState<{ label: string; value: string; }[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);

  const { data: allocatedNominalsList, isPending: isAllocatedNominalsLoading } =
    useAllocatedNominals();

  useEffect(() => {
    const setMapRegion = async () => {
      await updateInformation();
      setInitialRegion({
        latitude: information.location.lat,
        longitude: information.location.long,
        latitudeDelta: 10,
        longitudeDelta: 10,
      });
    };
    setMapRegion();
  }, []);

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

  const handleAllocatedNominalChange = (value: string) => {
    const selectedNominal = allocatedNominalsList?.results?.find((nominal: { id: number; }) => nominal.id === Number(value));
    if (selectedNominal) {
      handleChange('allocatedNominal', {
        value: selectedNominal.id,
        name: selectedNominal.request_id,
        latitude: selectedNominal.lat,
        longitude: selectedNominal.lng,
        region: selectedNominal.region,
        city: selectedNominal.city,
      });
      // Set the candidate location to the nominal's location initially
      handleChange('latitude', selectedNominal.lat.toString());
      handleChange('longitude', selectedNominal.lng.toString());
    }
  };

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    handleChange('latitude', latitude.toString());
    handleChange('longitude', longitude.toString());
  };

  // --- Declarative Markers ---
  const markers: MarkerData[] = [];

  // Add the static allocated nominal marker (always green)
  if (candidateType === 'allocated' && formData.allocatedNominal?.latitude) {
    markers.push({
      latitude: parseFloat(formData.allocatedNominal.latitude),
      longitude: parseFloat(formData.allocatedNominal.longitude),
      color: 'green',
    });
  }

  // Add the user-selected candidate marker (always blue)
  const candidateLat = parseFloat(formData.latitude);
  const candidateLng = parseFloat(formData.longitude);

  if (!isNaN(candidateLat) && !isNaN(candidateLng)) {
    // Avoid adding a duplicate marker if the candidate location is the same as the allocated nominal
    const isDuplicate = markers.some(marker => marker.latitude === candidateLat && marker.longitude === candidateLng);
    if (!isDuplicate) {
      markers.push({
        latitude: candidateLat,
        longitude: candidateLng,
        color: 'blue',
      });
    }
  }

  const candidateTypeOptions = [
    { label: 'Independent', value: 'independent' },
    { label: 'Allocated Nominal', value: 'allocated' },
  ];

  const allocatedNominalOptions =
  allocatedNominalsList?.results?.map((nominal: { request_id: string; id: number; }) => ({
    label: nominal.request_id,
    value: nominal.id.toString(),
  })) || [];

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
                selectedValue={formData.allocatedNominal?.value}
                onValueChange={handleAllocatedNominalChange}
              />
              {errors.allocatedNominal && <ErrorText message={errors.allocatedNominal} />}
              {/* {formData.allocatedNominal && (
                <View>
                  <Text>ID: {formData.allocatedNominal.value}</Text>
                  <Text>Request ID: {formData.allocatedNominal.name}</Text>
                  <Text>Latitude: {formData.allocatedNominal.latitude}</Text>
                  <Text>Longitude: {formData.allocatedNominal.longitude}</Text>
                  <Text>Region: {formData.allocatedNominal.region}</Text>
                  <Text>City: {formData.allocatedNominal.city}</Text>
                </View>
              )} */}
            </>
          )}
        </>
      )}
       <View style={{ marginTop: 20 }}>
        <Heading>Site Geographical Location</Heading>
      </View>
      <View style={{ height: 200, marginVertical: 20 }}>
        <MapContainer>
          {initialRegion && <GoogleMap region={initialRegion} onPress={handleMapPress} markers={markers} />}
        </MapContainer>
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
