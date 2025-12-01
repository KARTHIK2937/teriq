// Define the type for the form data
export interface FormData {
    regionProvince: string;
    cityTown: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    propertyType: string;
    landlordOffering: string;
    allocatedNominal: string;
    email: string;
    siteRegistrationStatus: string;
    siteElectricConnection: string;
    ownerFirstName: string;
    ownerLastName: string;
    ownerEmail: string;
    ownerNumber: string;
    country: string;
    ownerRegionProvince: string;
    length: string;
    breadth: string;
    doorPlotNumber: string;
    building: string;
    streetAddress: string;
    sitepostCode: string;
    provinceDistrict: string;
    propertyRights: string;
    leaseRestriction: string;
    expectedLeaseAmount: string;
    fenceType: string;
    siteAccessPermit: string;
    nearestFiberAccessPoint: string;
    nearestFiberAccessPointDistance: string;
    northEast: string;
    east: string;
    southEast: string;
    southWest: string;
    west: string;
    northWest: string;
    loadBearingPillars: string;
    siteBuildingPlan: string;
    frontElevation: string;
    backElevation: string;
    frontSideElevation: string;
    secondSideElevation: string;
    propertyGridStatus: string;
    electicityConnectionType: string;
    averageGridPower: string;
    electricityConsumerNumber: string;
    ownershipProof: string;
    taxDocument: string;
    incomeTaxReceipt: string;
    landSurveyPlanReport: string;
    waterBill: string;
    electricityBill: string;
    ownerDoorPlotNumber: string;
    ownerBuilding: string;
    ownerStreetAddress: string;
    postCode: string;
    district: string;
    pinZip: string;
    ownerCityTown: string;
    consent1: string;
    consent2: string;
    consent: string;
}

// Define the type for the props of the step components
export interface StepProps {
  formData: FormData;
  handleChange: (name: keyof FormData, value: string) => void;
  userRole: string | null;
}

// Define the type for the props of the Step1 component
export interface Step1Props extends StepProps {
    candidateType: string;
    setCandidateType: (value: string) => void;
    countryId: string | null;
    errors: Partial<Record<keyof FormData, string>>;
  }

  export interface Step5Props {
    formData: FormData;
    handleChange: (name: keyof FormData, value: string) => void;
    errors: Partial<Record<keyof FormData, string>>;
  }
