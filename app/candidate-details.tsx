import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SideDrawer } from '../components/SideDrawer';
import { Colors } from '../constants/theme';
import { useCandidateDetails } from '../hooks/useCandidateDetails';

const HamburgerIcon = () => (
    <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    </View>
);

const CandidateDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { candidate, loading, error } = useCandidateDetails(id as string);
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const renderDetail = (label: string, value: any) => {
    const displayValue = value === null || value === undefined || value === '' ? 'N/A' : value.toString();
    return (
      <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.text}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Candidate Details</Text>
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
                <HamburgerIcon />
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>Candidate Details</Text>

        {loading && <ActivityIndicator size="large" color={Colors.light.primary} />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {candidate && (
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.detailsContainer}>
                {renderDetail('ID', candidate.id)}
                {/* {renderDetail('Selected', candidate.is_selected)} */}
                {/* {renderDetail('Status', candidate.candidate_status)} */}
                {renderDetail('Date Added', new Date(candidate.date_added).toLocaleDateString())}
                {renderDetail('Owner Name', `${candidate.owner_firstname} ${candidate.owner_lastname}`)}
                {renderDetail('Owner Email', candidate.owner_email)}
                {renderDetail('Owner Phone', candidate.owner_phone)}
                {renderDetail('Zip Code', candidate.site_zip_code)}
                {renderDetail('Requirement', candidate.requirement)}
                {renderDetail('Site ID', candidate.site_id)}
                {candidate.location && (
                    <>
                        {renderDetail('Latitude', candidate.location.latitude)}
                        {renderDetail('Longitude', candidate.location.longitude)}
                    </>
                )}
                {renderDetail('Land Area Length', candidate.land_area_length)}
                {renderDetail('Land Area Breadth', candidate.land_area_breadth)}
                {renderDetail('Registration Status', candidate.site_reg_status)}
                {renderDetail('Site Type', candidate.site_type)}
                {renderDetail('Site Subtype', candidate.site_type_subtype)}
                {renderDetail('Grid Connection', candidate.site_grid_connection)}
                {renderDetail('Metered Electricity', candidate.site_metered_electricity)}
                {renderDetail('Nearest Fiber', candidate.nearest_fiber_access_point)}
                {renderDetail('Load Bearing Pillars', candidate.load_bearing_pillars_columns)}
                {renderDetail('Building Plan', candidate.site_building_plan)}
                {renderDetail('Electricity Connection', candidate.site_electricity_connection)}
                {renderDetail('Region', candidate.region)}
                {renderDetail('Owner Residence', `${candidate.owner_residence_state}, ${candidate.owner_residence_country}`)}
                {renderDetail('City', candidate.city)}
                {renderDetail('Can Update Docs', candidate.can_update_org_docs)}
                {renderDetail('Can View Docs', candidate.can_view_org_docs)}
                {renderDetail('Landlord Tax ID', candidate.landlord_tax_id)}
                {renderDetail('Landlord Govt ID', candidate.landlord_govt_id)}
                {renderDetail('User', candidate.user)}
          </View>
        </ScrollView>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: Colors.light.darkBlue,
  },
  headerTitle: {
      color: Colors.light.white,
      fontSize: 22,
      fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  detailsContainer: {
    backgroundColor: Colors.light.white,
    padding: 20,
    borderRadius: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.darkGrey,
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.light.darkBlue,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.light.softBlack,
    flex: 1,
    textAlign: 'right',
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.danger,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: Colors.light.darkBlue,
},
});

export default CandidateDetailsScreen;
