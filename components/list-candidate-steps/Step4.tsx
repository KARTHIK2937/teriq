
import React from 'react';
import { ScrollView } from 'react-native';
import Heading from '../ui/Heading';
import InputDocument from '../ui/InputDocument';
import { SubHeader } from '../ui/SubHeader';
import { StepProps } from './types';

const Step4 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Heading>Legal Documents</Heading>
    <SubHeader>Proof of ownership of the land or title deed</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.ownershipProof}
      onValueChange={(value) => handleChange('ownershipProof', value)}
    />
    <SubHeader>Property tax document or receipt</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.taxDocument}
      onValueChange={(value) => handleChange('taxDocument', value)}
    />
    <SubHeader>
      Latest income tax payment receipt filed by the landlord
    </SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.incomeTaxReceipt}
      onValueChange={(value) => handleChange('incomeTaxReceipt', value)}
    />
    <SubHeader>Land survey plan/report</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.landSurveyPlanReport}
      onValueChange={(value) => handleChange('landSurveyPlanReport', value)}
    />
    <SubHeader>Latest water bill</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.waterBill}
      onValueChange={(value) => handleChange('waterBill', value)}
    />
    <SubHeader>Latest electricity bill</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.electricityBill}
      onValueChange={(value) => handleChange('electricityBill', value)}
    />
  </ScrollView>
);

export default Step4;
