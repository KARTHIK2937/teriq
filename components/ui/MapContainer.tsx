
import React from 'react';
import { View, StyleSheet } from 'react-native';

type MapContainerProps = {
  children: React.ReactNode;
};

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default MapContainer;
