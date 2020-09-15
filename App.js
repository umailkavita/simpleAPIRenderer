/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {fetchWeatherMapFromAPI} from './src/apis/APIHelper';
import {TemperatureComponent} from './src/components/TemperatureComponent';
import {WeatherComponent} from './src/components/WeatherComponent';

class App extends Component {
  state = {
    weatherData: null,
    loading: false,
  };
  componentDidMount() {
    this.fetchDataFromServer();
  }

  fetchDataFromServer = async () => {
    this.setState({loading: true});
    //asyncronus data from the Weather Map API, I have used Melbourne location for now
    const apiData = await fetchWeatherMapFromAPI('Melbourne');
    if (apiData) {
      this.setState({weatherData: apiData, loading: false});
    } else {
      console.log('ERROR');
      this.setState({loading: false});
    }
  };

  render() {
    const {weatherData, loading} = this.state;
    if (weatherData) {
      return (
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={styles.cityTitle}>{`${weatherData.city}`}</Text>
            <WeatherComponent title={weatherData.weather.description} />
            <View style={styles.temperatureContainer}>
              <TemperatureComponent
                title="Current Temperature"
                value={`${weatherData.temparature.currentTemp}`}
              />
              <TemperatureComponent
                title="Minimun Temperature"
                value={`${weatherData.temparature.minTemp}`}
              />
              <TemperatureComponent
                title="Maximum Temperature"
                value={`${weatherData.temparature.maxTemp}`}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <View style={styles.body}>
          {/* show indicator when data is loading from api */}
          <ActivityIndicator
            animating={loading}
            hidesWhenStopped={true}
            color={Colors.black}
          />
          {/* show error message when loading has finished from api */}
          {!loading && (
            <Text style={styles.errorMessage}>
              {`Error! \nPlease check the city you have selected.`}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  cityTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
  },
  errorMessage: {
    fontSize: 30,
    fontWeight: '500',
    color: '#671A09',
    textAlign: 'center',
  },
  temperatureContainer: {
    backgroundColor: Colors.white,
    width: '100%',
  },
});

export default App;
