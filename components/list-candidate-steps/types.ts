
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
    address: string;
    qualification: string;
    experience: string;
    siteRegistrationStatus: string;
    siteElectricConnection: string;
    ownerFirstName: string;
    ownerLastName: string;
    ownerEmail: string;
    ownerNumber: string;
    country: string;
    ownerRegionProvince: string;
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
