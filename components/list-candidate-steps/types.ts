export type Errors = Partial<Record<keyof FormData, string>>;

export interface StepProps {
  formData: FormData;
  handleChange: (field: keyof FormData, value: any) => void;
  errors: Errors;
  userRole?: string;
}

export interface FormData {
    regionProvince: string;
    cityTown: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    propertyType: string;
    landlordOffering: string;
    allocatedNominal: any;
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
    northEast: any;
    east: any;
    southEast: any;
    southWest: any;
    west: any;
    northWest: any;
    loadBearingPillars: string;
    siteBuildingPlan: any;
    frontElevation: any;
    backElevation: any;
    frontSideElevation: any;
    secondSideElevation: any;
    propertyGridStatus: string;
    electicityConnectionType: string;
    averageGridPower: string;
    electricityConsumerNumber: string;
    ownershipProof: any;
    taxDocument: any;
    incomeTaxReceipt: any;
    landSurveyPlanReport: any;
    waterBill: any;
    electricityBill: any;
    ownerDoorPlotNumber: string;
    ownerBuilding: string;
    ownerStreetAddress: string;
    postCode: string;
    district: string;
    pinZip: string;
    ownerCityTown: string;
    consent: string;
    consent1: string;
    consent2: string;
}

export interface Step1Props {
    formData: FormData;
    handleChange: (field: keyof FormData, value: any) => void;
    userRole: string;
    candidateType: string;
    setCandidateType: (value: string) => void;
    countryId: string;
    errors: Errors;
  }
  
  export interface Step2Props {
    formData: FormData;
    handleChange: (field: keyof FormData, value: any) => void;
    errors: Errors;
  }
  
  export interface Step3Props {
    formData: FormData;
    handleChange: (field: keyof FormData, value: any) => void;
    errors: Errors;
  }
  
  export interface Step4Props {
    formData: FormData;
    handleChange: (field: keyof FormData, value: any) => void;
    errors: Errors;
  }
  
  export interface Step5Props {
    formData: FormData;
    handleChange: (field: keyof FormData, value: any) => void;
    errors: Errors;
    isSuccess: boolean;
  }
  