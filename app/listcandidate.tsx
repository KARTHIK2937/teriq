import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Step1 from '../components/list-candidate-steps/Step1';
import Step2 from '../components/list-candidate-steps/Step2';
import Step3 from '../components/list-candidate-steps/Step3';
import Step4 from '../components/list-candidate-steps/Step4';
import Step5 from '../components/list-candidate-steps/Step5';
import { FormData } from '../components/list-candidate-steps/types';
import { SideDrawer } from '../components/SideDrawer';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/theme';

const HamburgerIcon = () => (
    <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
      <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
      <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
      <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    </View>
  );

const ListCandidateScreen = () => {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [candidateType, setCandidateType] = useState('independent');
  const [countryId, setCountryId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    regionProvince: '',
    cityTown: '',
    latitude: '',
    longitude: '',
    zipcode: '',
    propertyType: '',
    landlordOffering: '',
    allocatedNominal: '',
    email: '',
    siteRegistrationStatus: '',
    siteElectricConnection: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerNumber: '',
    country: '',
    ownerRegionProvince: '',
    length: '',
    breadth: '',
    doorPlotNumber: '',
    building: '',
    streetAddress: '',
    sitepostCode: '',
    provinceDistrict: '',
    propertyRights: '',
    leaseRestriction: '',
    expectedLeaseAmount: '',
    fenceType: '',
    siteAccessPermit: '',
    nearestFiberAccessPoint: '',
    nearestFiberAccessPointDistance: '',
    northEast: '',
    east: '',
    southEast: '',
    southWest: '',
    west: '',
    northWest: '',
    loadBearingPillars: '',
    siteBuildingPlan: '',
    frontElevation: '',
    backElevation: '',
    frontSideElevation: '',
    secondSideElevation: '',
    propertyGridStatus: '',
    electicityConnectionType: '',
    averageGridPower: '',
    electricityConsumerNumber: '',
    ownershipProof: '',
    taxDocument: '',
    incomeTaxReceipt: '',
    landSurveyPlanReport: '',
    waterBill: '',
    electricityBill: '',
    ownerDoorPlotNumber: '',
    ownerBuilding: '',
    ownerStreetAddress: '',
    postCode: '',
    district: '',
    pinZip: '',
    ownerCityTown: '',
    consent1: '',
    consent2: '',
    consent: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.user && userData.user.role) {
            setUserRole(userData.user.role);
          }
          if (userData && userData.country && userData.country.id) {
            setCountryId(userData.country.id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data from storage', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      }
  };

  const validateStep = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
        if (!formData.latitude) newErrors.latitude = 'Latitude is required.';
        if (!formData.longitude) newErrors.longitude = 'Longitude is required.';
        if (!formData.regionProvince) newErrors.regionProvince = 'Region/Province is required.';
        if (!formData.cityTown) newErrors.cityTown = 'City/Town is required.';
        if (!formData.zipcode) newErrors.zipcode = 'Pin/Zipcode is required.';
        if (!formData.propertyType) newErrors.propertyType = 'Property Type is required.';
        if ((formData.propertyType === 'C' || formData.propertyType === 'R') && !formData.landlordOffering) newErrors.landlordOffering = 'Property Offering is required.';
        if (!formData.siteRegistrationStatus) newErrors.siteRegistrationStatus = 'Site Registration Status is required.';
        if (!formData.siteElectricConnection) newErrors.siteElectricConnection = 'Electricity Connection is required.';
        if (!formData.ownerFirstName) newErrors.ownerFirstName = "Landlord's first name is required.";
        if (!formData.ownerLastName) newErrors.ownerLastName = "Landlord's last name is required.";
        if (!formData.ownerEmail) newErrors.ownerEmail = "Landlord's email is required.";
        if (!formData.ownerNumber) newErrors.ownerNumber = "Landlord's phone number is required.";
        if (!formData.country) newErrors.country = 'Country is required.';
        if (!formData.ownerRegionProvince) newErrors.ownerRegionProvince = 'Region/Province is required.';
        if (userRole === 'A' && candidateType === 'allocated' && !formData.allocatedNominal) newErrors.allocatedNominal = 'Allocated Nominal is required.';
        if (userRole === 'A' && formData.consent !== 'true') newErrors.consent = 'You must give consent to proceed.';
    }
    if (step === 5) {
        if (formData.consent1 !== 'true') newErrors.consent1 = 'You must give consent to proceed.';
        if (formData.consent2 !== 'true') newErrors.consent2 = 'You must give consent to proceed.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step === 2 && formData.siteElectricConnection === 'N') {
        setStep(4);
      } else if (step < 5) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step === 4 && formData.siteElectricConnection === 'N') {
      setStep(2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} userRole={userRole} candidateType={candidateType} setCandidateType={setCandidateType} countryId={countryId} errors={errors} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} />;
      case 5:
        return <Step5 formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>List a Candidate</Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <HamburgerIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderStep()}
      </View>
      <View style={styles.navigation}>
        {step > 1 && <Button title="Previous" onPress={prevStep} style={styles.navButton} />}
        {step < 5 && <Button title="Next" onPress={nextStep} style={styles.navButton} />}
        {/* {step === 5 && <Button title="Submit" onPress={submitForm} style={styles.navButton} />} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.light.white,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.darkBlue,
        paddingHorizontal: 20,
        paddingVertical: 15,
      },
      headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.light.white,
      },
  content: {
    flex: 1,
    padding: 20,
  },
  formStep: {
    width: '100%',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navButton: {
    width: '45%',
  },
});

export default ListCandidateScreen;
