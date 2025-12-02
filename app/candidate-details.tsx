import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SideDrawer } from '../components/SideDrawer';
import { Colors } from '../constants/theme';
import { useCandidateDetails } from '../hooks/useCandidateDetails';

const HamburgerIcon = () => (
    <View style={styles.hamburgerIcon}>
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
    </View>
);

const Card = ({ children, style }: any) => (
    <View style={[styles.card, style]}>{children}</View>
);

const SectionHeader = ({ title }: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
);

const CandidateDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const { candidate, loading, error } = useCandidateDetails(id as string);
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const renderDetailRow = (label: string, value: any) => {
        const displayValue = value === null || value === undefined || value === '' ? 'N/A' : value.toString();
        return (
            <View style={styles.detailRow}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.text}>{displayValue}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <SideDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Candidate Details</Text>
                <TouchableOpacity onPress={() => setDrawerVisible(true)}>
                    <HamburgerIcon />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color={Colors.light.primary} style={styles.loader} />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {candidate && (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.mainTitle}>Candidate Details</Text>

                    <Card>
                        <SectionHeader title="General Information" />
                        {renderDetailRow('ID', candidate.id)}
                        {renderDetailRow('Date Added', new Date(candidate.date_added).toLocaleDateString())}
                        {renderDetailRow('Requirement', candidate.requirement)}
                        {renderDetailRow('User', candidate.user)}
                    </Card>

                    <Card>
                        <SectionHeader title="Site Details" />
                        {renderDetailRow('Site ID', candidate.site_id)}
                        {renderDetailRow('Site Type', candidate.site_type)}
                        {renderDetailRow('Site Subtype', candidate.site_type_subtype)}
                        {renderDetailRow('Registration Status', candidate.site_reg_status)}
                        {renderDetailRow('Grid Connection', candidate.site_grid_connection)}
                        {renderDetailRow('Metered Electricity', candidate.site_metered_electricity)}
                        {renderDetailRow('Nearest Fiber', candidate.nearest_fiber_access_point)}
                        {renderDetailRow('Load Bearing Pillars', candidate.load_bearing_pillars_columns)}
                        {renderDetailRow('Building Plan', candidate.site_building_plan)}
                        {renderDetailRow('Electricity Connection', candidate.site_electricity_connection)}
                        {renderDetailRow('Can Update Docs', candidate.can_update_org_docs)}
                        {renderDetailRow('Can View Docs', candidate.can_view_org_docs)}
                        {renderDetailRow('Land Area Length', candidate.land_area_length)}
                        {renderDetailRow('Land Area Breadth', candidate.land_area_breadth)}
                    </Card>

                    <Card>
                        <SectionHeader title="Location Information" />
                        {candidate.location && (
                            <>
                                {renderDetailRow('Latitude', candidate.location.latitude)}
                                {renderDetailRow('Longitude', candidate.location.longitude)}
                            </>
                        )}
                        {renderDetailRow('Zip Code', candidate.site_zip_code)}
                        {renderDetailRow('Region', candidate.region)}
                        {renderDetailRow('City', candidate.city)}
                    </Card>

                    <Card>
                        <SectionHeader title="Landlord Information" />
                        {renderDetailRow('Owner Name', `${candidate.owner_firstname} ${candidate.owner_lastname}`)}
                        {renderDetailRow('Owner Email', candidate.owner_email)}
                        {renderDetailRow('Owner Phone', candidate.owner_phone)}
                        {renderDetailRow('Owner Residence', `${candidate.owner_residence_state}, ${candidate.owner_residence_country}`)}
                        {renderDetailRow('Landlord Tax ID', candidate.landlord_tax_id)}
                        {renderDetailRow('Landlord Govt ID', candidate.landlord_govt_id)}
                    </Card>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    container: {
        padding: 20,
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
    hamburgerIcon: {
        width: 24,
        height: 24,
        justifyContent: 'space-around',
    },
    hamburgerLine: {
        height: 3,
        backgroundColor: Colors.light.white,
        borderRadius: 2,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.darkBlue,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: Colors.light.white,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.darkBlue,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.darkGrey,
        paddingBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
        color: Colors.light.softBlack,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: Colors.light.softBlack,
        flex: 1,
        textAlign: 'right',
    },
    loader: {
        marginTop: 50,
    },
    errorText: {
        fontSize: 18,
        color: Colors.light.danger,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default CandidateDetailsScreen;
