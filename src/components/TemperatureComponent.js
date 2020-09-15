import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  temperatureContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    color: Colors.black,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    alignItems: 'center',
  },
});

export const TemperatureComponent = ({title, value}) => {
  return (
    <View style={styles.temperatureContainer}>
      <Text style={styles.title}>{`${title} in Kelvin`}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
