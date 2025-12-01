
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SideDrawer } from '../components/SideDrawer';
import Table from '../components/ui/Table';
import { Colors } from '../constants/theme';
import { useCandidates } from '../hooks/useCandidates';

const HamburgerIcon = () => (
    <View style={{ width: 24, height: 24, justifyContent: 'space-around' }}>
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: Colors.light.white, borderRadius: 2 }} />
    </View>
);

const columns = [
    { header: 'Date Listed', accessor: 'dateListed', width: 150 },
    { header: 'Candidate ID', accessor: 'candidateId', width: 150 },
    { header: 'Site Type', accessor: 'siteType', width: 120 },
    { header: 'Expected Lease Amount', accessor: 'expectedLeaseAmount', width: 200 },
    { header: 'Registration Status', accessor: 'registrationStatus', width: 180 },
    { header: 'Region/Province', accessor: 'regionProvince', width: 150 },
    { header: 'City/Town', accessor: 'cityTown', width: 150 },
];

export default function CandidateListScreen() {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const { 
        candidates, 
        isLoading, 
        error, 
        fetchNextPage, 
        fetchPreviousPage, 
        hasNextPage, 
        hasPreviousPage, 
        count, 
        currentPage 
    } = useCandidates();

    const transformedData = candidates.map(candidate => ({
      id: candidate.id,
      dateListed: new Date(candidate.date_added).toLocaleDateString(),
      candidateId: candidate.site_id,
      siteType: candidate.site_type,
      expectedLeaseAmount: candidate.expected_lease_amount ? `${candidate.expected_lease_amount}` : 'N/A',
      registrationStatus: candidate.site_reg_status || 'N/A',
      regionProvince: candidate.region,
      cityTown: candidate.city,
    }));

    const totalPages = Math.ceil(count / 10);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Candidate List</Text>
                <TouchableOpacity onPress={() => setDrawerVisible(true)}>
                    <HamburgerIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.tableContainer}>
              <Text style={styles.title}>Your List of Candidates</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.light.darkBlue} />
              ) : error ? (
                <Text style={styles.errorText}>Failed to load candidates. Please try again later.</Text>
              ) : (
                <Table 
                    columns={columns}
                    data={transformedData}
                    onNext={fetchNextPage}
                    onPrevious={fetchPreviousPage}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
              )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
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
    tableContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 25,
        textAlign: 'center',
        color: Colors.light.darkBlue,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
});
