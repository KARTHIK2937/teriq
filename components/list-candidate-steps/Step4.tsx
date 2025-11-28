
import React from 'react';
import { View } from 'react-native';
import Heading from '../ui/Heading';
import { InputField } from '../ui/InputField';
import { StepProps } from './types';

const Step4 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <View>
    <Heading>Step 4: Qualifications</Heading>
    <InputField
      placeholder="Highest Qualification"
      value={formData.qualification}
      onChangeText={(text) => handleChange('qualification', text)}
    />
  </View>
);

export default Step4;
