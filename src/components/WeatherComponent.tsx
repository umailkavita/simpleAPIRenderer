import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  weatherContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#145A32',
  },
});

interface WeatherComponentProps {
  title: string;
}

export const WeatherComponent = ({ title }: WeatherComponentProps) => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
