
import React from 'react';
import { View } from 'react-native';
import Heading from '../ui/Heading';
import { InputField } from '../ui/InputField';
import { StepProps } from './types';

const Step5 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <View>
    <Heading>Step 5: Work Experience</Heading>
    <InputField
      placeholder="Years of Experience"
      value={formData.experience}
      onChangeText={(text) => handleChange('experience', text)}
    />
  </View>
);

export default Step5;
