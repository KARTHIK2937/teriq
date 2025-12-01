import React from 'react';
import { ScrollView, View } from 'react-native';
import Heading from '../ui/Heading';
import InputDocument from '../ui/InputDocument';
import { InputDropdown } from '../ui/InputDropdown';
import { InputField } from '../ui/InputField';
import { SubHeader } from '../ui/SubHeader';
import { StepProps } from './types';

const Step2 = ({ formData, handleChange }: Omit<StepProps, 'userRole'>) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Heading>Site Related Information</Heading>
    <SubHeader>Length</SubHeader>
    <InputField
      placeholder="Length (in meters)"
      value={formData.length}
      onChangeText={(text) => handleChange('length', text)}
    />
    <SubHeader>Breadth</SubHeader>
    <InputField
      placeholder="Breadth (in meters)"
      value={formData.breadth}
      onChangeText={(text) => handleChange('breadth', text)}
    />
    <SubHeader>Door/Plot Number</SubHeader>
    <InputField
      placeholder="Door/Plot Number"
      value={formData.doorPlotNumber}
      onChangeText={(text) => handleChange('doorPlotNumber', text)}
    />
    <SubHeader>Building/Sub-Building</SubHeader>
    <InputField
      placeholder="Building/Sub-Building"
      value={formData.building}
      onChangeText={(text) => handleChange('building', text)}
    />
    <SubHeader>Street Address</SubHeader>
    <InputField
      placeholder="Street Address"
      value={formData.streetAddress}
      onChangeText={(text) => handleChange('streetAddress', text)}
    />
    <SubHeader>Locality/Town Post Code</SubHeader>
    <InputField
      placeholder="Locality/Town Post Code"
      value={formData.sitepostCode}
      onChangeText={(text) => handleChange('sitepostCode', text)}
    />
    <SubHeader>Province/District</SubHeader>
    <InputField
      placeholder="Province/District"
      value={formData.provinceDistrict}
      onChangeText={(text) => handleChange('provinceDistrict', text)}
    />
    <SubHeader>Property Rights</SubHeader>
    <InputDropdown
      label="Property Rights"
      items={[
        { label: 'Owned', value: 'O' },
        { label: 'Leased', value: 'L' },
        { label: 'Special Grants', value: 'NA' },
      ]}
      selectedValue={formData.propertyRights}
      onValueChange={(value) => handleChange('propertyRights', value)}
    />
    <SubHeader>Lease Restriction (if any)</SubHeader>
    <InputDropdown
      label="Lease Restriction (if any)"
      items={[
        { label: 'Yes', value: 'Y' },
        { label: 'No', value: 'N' },
      ]}
      selectedValue={formData.leaseRestriction}
      onValueChange={(value) => handleChange('leaseRestriction', value)}
    />
    <SubHeader>Expected Lease Amount</SubHeader>
    <InputField
        placeholder="Expected Lease Amount"
        value={formData.expectedLeaseAmount}
        onChangeText={(text) => handleChange('expectedLeaseAmount', text)}
    />
    <SubHeader>Type of Fence Installed</SubHeader>
    <InputDropdown
        label="Type of Fence Installed"
        items={[
            { label: 'Palisade', value: 'P' },
            { label: 'Block/Brick Wall', value: 'B' },
            { label: 'Wire Mesh', value: 'W' },
            { label: 'Fencing Not Available', value: 'N' },
        ]}
        selectedValue={formData.fenceType}
        onValueChange={(value) => handleChange('fenceType', value)}
    />
    <SubHeader>Site Access Permit</SubHeader>
    <InputDropdown
        label="Site Access Permit"
        items={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
        ]}
        selectedValue={formData.siteAccessPermit}
        onValueChange={(value) => handleChange('siteAccessPermit', value)}
    />
    <SubHeader>Nearest Fiber/Tower Access Point</SubHeader>
    <InputDropdown
        label="Nearest Fiber/Tower Access Point"
        items={[
            { label: 'Available', value: 'A' },
            { label: 'Not Available', value: 'N' },
        ]}
        selectedValue={formData.nearestFiberAccessPoint}
        onValueChange={(value) => handleChange('nearestFiberAccessPoint', value)}
    />
    {formData.nearestFiberAccessPoint === 'A' && (
        <>
            <SubHeader>Nearest Fiber/Tower Access Point Distance</SubHeader>
            <InputField
                placeholder="Nearest Fiber/Tower Access Point Distance"
                value={formData.nearestFiberAccessPointDistance}
                onChangeText={(text) =>
                    handleChange('nearestFiberAccessPointDistance', text)
                }
            />
        </>
    )}
    <View style={{ marginTop: 20 }}>
    <Heading>Property Images</Heading></View>
    
    {(formData.propertyType === 'C' || formData.propertyType === 'R') && (
      <>
        <SubHeader>Does the building have load-bearing pillars/columns</SubHeader>
        <InputDropdown
          label="Does the building have load-bearing pillars/columns"
          items={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ]}
          selectedValue={formData.loadBearingPillars}
          onValueChange={(value) => handleChange('loadBearingPillars', value)}
        />
        <SubHeader>Does the building have building plan that can be shared</SubHeader>
        <InputDropdown
          label="Does the building have building plan that can be shared"
          items={[
            { label: 'Available', value: 'A' },
            { label: 'Not Available', value: 'N' },
          ]}
          selectedValue={formData.siteBuildingPlan}
          onValueChange={(value) => handleChange('siteBuildingPlan', value)}
        />
        <SubHeader>Front elevation</SubHeader>
        <InputDocument
          label="Select a document"
          value={formData.frontElevation}
          onValueChange={(value) => handleChange('frontElevation', value)}
        />
        <SubHeader>Back elevation</SubHeader>
        <InputDocument
          label="Select a document"
          value={formData.backElevation}
          onValueChange={(value) => handleChange('backElevation', value)}
        />
        <SubHeader>Front-side elevation</SubHeader>
        <InputDocument
          label="Select a document"
          value={formData.frontSideElevation}
          onValueChange={(value) => handleChange('frontSideElevation', value)}
        />
        <SubHeader>Second-side elevation</SubHeader>
        <InputDocument
          label="Select a document"
          value={formData.secondSideElevation}
          onValueChange={(value) => handleChange('secondSideElevation', value)}
        />
      </>
    )}

     <SubHeader>North East (0-60deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.northEast}
      onValueChange={(value) => handleChange('northEast', value)}
    />
     <SubHeader>East (60-120deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.east}
      onValueChange={(value) => handleChange('east', value)}
    />
     <SubHeader>South east (120-180deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.southEast}
      onValueChange={(value) => handleChange('southEast', value)}
    />
      <SubHeader>South West (180-240deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.southWest}
      onValueChange={(value) => handleChange('southWest', value)}
    />
      <SubHeader>West (240-300deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.west}
      onValueChange={(value) => handleChange('west', value)}
    />
      <SubHeader>North West (300-360deg)</SubHeader>
    <InputDocument
      label="Select a document"
      value={formData.northWest}
      onValueChange={(value) => handleChange('northWest', value)}
    />
  </ScrollView>
);

export default Step2;