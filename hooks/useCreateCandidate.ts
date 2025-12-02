import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormData as CustomFormData } from '../components/list-candidate-steps/types';
import { createCandidate } from '../services/createCandidate';

export const useCreateCandidate = () => {
  return useMutation({
    mutationFn: async (data: CustomFormData) => {
      const formDataToSend = new FormData();
      const storedData = data;
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString || '{}');
      console.log('Retrieved user data from AsyncStorage:', userData);

      const obj = {
        // Geolocation
        requirement: storedData.allocatedNominal ? storedData.allocatedNominal.value : null,
        agent_site_onboarding_consent: storedData.consent,
        region: storedData.regionProvince,
        city: storedData.cityTown,
        site_postal_address_line1: storedData.doorPlotNumber,
        site_postal_address_line2: storedData.building,
        site_postal_address_line3: storedData.streetAddress,
        site_postal_address_line4: storedData.sitepostCode,
        site_postal_address_line5: storedData.provinceDistrict,
        site_zip_code: storedData.zipcode,
  
        // Site Related Information
        land_area_length: storedData.length,
        land_area_breadth: storedData.breadth,
        site_type: storedData.propertyType,
        site_reg_status: storedData.siteRegistrationStatus,
        land_rights: storedData.propertyRights,
        lease_restrictions: storedData.leaseRestriction,
        expected_lease_amount: storedData.expectedLeaseAmount,
        fence_type: storedData.fenceType,
        site_access_permit: storedData.siteAccessPermit,
        nearest_fiber_access_point: storedData.nearestFiberAccessPoint,
        nearest_fiber_access_point_distance:
          storedData.nearestFiberAccessPointDistance,
  
        // Additional Fields
        surrounding_img_1: storedData.northEast,
        surrounding_img_2: storedData.east,
        surrounding_img_3: storedData.southEast,
        surrounding_img_4: storedData.southWest,
        surrounding_img_5: storedData.west,
        surrounding_img_6: storedData.northWest,
        front_elevation: storedData.frontElevation,
        back_elevation: storedData.backElevation,
        first_side_elevation: storedData.frontSideElevation,
        second_side_elevation: storedData.secondSideElevation,
        site_type_subtype: storedData.landlordOffering,
        load_bearing_pillars_columns: storedData.loadBearingPillars,
        site_building_plan: storedData.siteBuildingPlan,
  
        // Legal Documents
        property_tax_document: storedData.taxDocument,
        landlord_recent_it: storedData.incomeTaxReceipt,
        land_survey_plan: storedData.landSurveyPlanReport,
        recent_water_bill: storedData.waterBill,
        recent_power_bill: storedData.electricityBill,
  
        // Electrification Details
        site_electricity_connection: storedData.siteElectricConnection,
        site_grid_connection: storedData.propertyGridStatus,
        site_metered_electricity: storedData.electicityConnectionType,
        site_grid_availability: storedData.averageGridPower, //In number of hours || "", in a single day
        eb_consumer_meter_no: storedData.electricityConsumerNumber,
  
        // Ownership Proof
        land_ownership_proof: storedData.ownershipProof,
  
        // Owner's Details
        owner_email: storedData.ownerEmail,
        owner_firstname: storedData.ownerFirstName,
        owner_lastname: storedData.ownerLastName,
        owner_phone: storedData.ownerNumber,
        owner_residence_country: storedData.country,
        owner_residence_city: storedData.ownerCityTown,
        owner_residence_state: storedData.ownerRegionProvince,
        owner_postal_address_line1: storedData.ownerDoorPlotNumber,
        owner_postal_address_line2: storedData.ownerBuilding,
        owner_postal_address_line3: storedData.ownerStreetAddress,
        owner_postal_address_line4: storedData.postCode,
        owner_postal_address_line5: storedData.district,
        owner_zip_code: storedData.pinZip,
        document_access_consent: storedData.consent1,
        doc_legal_access_content: storedData.consent2,
        user: userData?.user?.id,
      };

      formDataToSend.append(
        'location',
        JSON.stringify({
          latitude: storedData.latitude,
          longitude: storedData.longitude,
        })
      );

      Object.entries(obj).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      });

      return createCandidate(formDataToSend);
    },
  });
};
