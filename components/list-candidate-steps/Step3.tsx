
import React from 'react';
import { ScrollView } from 'react-native';
import Heading from '../ui/Heading';
import { InputDropdown } from '../ui/InputDropdown';
import { InputField } from '../ui/InputField';
import { SubHeader } from '../ui/SubHeader';
import { StepProps } from './types';

const Step3 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Heading>Electrification Details</Heading>
    <SubHeader>Property grid connectivity status</SubHeader>
    <InputDropdown
        label={'Property grid connectivity status'}
        selectedValue={formData.propertyGridStatus}
        onValueChange={(itemValue) =>
        handleChange('propertyGridStatus', itemValue)
        }
        items={[
        { label: 'Domestic', value: 'D' },
        { label: 'Commercial', value: 'C' },
        { label: 'Both Domestic and Commercial', value: 'B' },
        { label: 'Not Available', value: 'N' },
        ]}
    />
    <SubHeader>Type of electricity connection</SubHeader>
    <InputDropdown
        label={'Type of electricity connection'}
        selectedValue={formData.electicityConnectionType}
        onValueChange={(itemValue) =>
        handleChange('electicityConnectionType', itemValue)
        }
        items={[
        { label: 'Prepaid', value: 'PRE' },
        { label: 'Postpaid', value: 'POST' },
        { label: 'Not Available', value: 'NA' },
        ]}
    />
    <SubHeader>Average grid power availability(in hrs)</SubHeader>
    <InputField
        placeholder="Average grid power availability(in hrs)"
        value={formData.averageGridPower}
        onChangeText={(text) => handleChange('averageGridPower', text)}
    />
    <SubHeader>Electricity consumer/meter number</SubHeader>
    <InputField
        placeholder="Electricity consumer/meter number"
        value={formData.electricityConsumerNumber}
        onChangeText={(text) =>
        handleChange('electricityConsumerNumber', text)
        }
    />
  </ScrollView>
);

export default Step3;
