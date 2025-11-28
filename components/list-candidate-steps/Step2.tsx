
import React from 'react';
import { View } from 'react-native';
import { InputField } from '../ui/InputField';
import { StepProps } from './types';
import Heading from '../ui/Heading';

const Step2 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <View>
    <Heading>Step 2: Contact Details</Heading>
    <InputField
      placeholder="Email"
      value={formData.email}
      onChangeText={(text) => handleChange('email', text)}
    />
  </View>
);

export default Step2;
