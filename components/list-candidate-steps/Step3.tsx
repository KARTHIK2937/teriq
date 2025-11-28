
import React from 'react';
import { View } from 'react-native';
import Heading from '../ui/Heading';
import { InputField } from '../ui/InputField';
import { StepProps } from './types';

const Step3 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <View>
    <Heading>Step 3: Address</Heading>
    <InputField
      placeholder="Address"
      value={formData.address}
      onChangeText={(text) => handleChange('address', text)}
    />
  </View>
);

export default Step3;
