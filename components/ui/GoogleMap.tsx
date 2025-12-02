import React from 'react';
import MapView, { PROVIDER_GOOGLE, Region, MapPressEvent, Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface MarkerData {
  latitude: number;
  longitude: number;
  color: 'blue' | 'green';
}

interface GoogleMapProps {
  region: Region;
  onPress: (e: MapPressEvent) => void;
  markers?: MarkerData[];
}

const GoogleMap = ({ region, onPress, markers }: GoogleMapProps) => {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={region}
      onPress={onPress}
    >
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          pinColor={marker.color}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMap;
