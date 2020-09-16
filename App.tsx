/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { fetchWeatherMapFromAPI } from './src/apis/APIHelper';
import { TemperatureComponent } from './src/components/TemperatureComponent';
import { WeatherComponent } from './src/components/WeatherComponent';
import { WeatherMap } from './src/models/WeatherMap';

interface AppProps {
}

interface AppState {
  weatherData: WeatherMap | null,
  loading: boolean,
}

class App extends Component<AppProps, AppState>{
  state = {
    weatherData: null,
    loading: false,
  };
  componentDidMount() {
    this.fetchDataFromServer();
  }

  fetchDataFromServer = async () => {
    this.setState({ loading: true });
    //asyncronus data from the Weather Map API, I have used Melbourne location for now
    const apiData = await fetchWeatherMapFromAPI('Melbourne');
    if (apiData) {
      this.setState({ weatherData: apiData, loading: false });
    } else {
      console.log('ERROR');
      this.setState({ weatherData: null, loading: false });
    }
  };
  renderWeatherDisplayView = () => {
    const { weatherData } = this.state;
    var weatherMap: WeatherMap = weatherData!
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={styles.cityTitle}>{`${weatherMap.city}`}</Text>
          <WeatherComponent title={weatherMap.weather.description} />
          <View style={styles.temperatureContainer}>
            <TemperatureComponent
              title="Current Temperature"
              value={`${weatherMap.temparature.currentTemp}`}
            />
            <TemperatureComponent
              title="Minimun Temperature"
              value={`${weatherMap.temparature.minTemp}`}
            />
            <TemperatureComponent
              title="Maximum Temperature"
              value={`${weatherMap.temparature.maxTemp}`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  renderDefaultView = () => {
    const { loading } = this.state;

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
  render() {
    const { weatherData } = this.state;

    if (weatherData) {
      //display wheather on screen whenever data available
      return (
        this.renderWeatherDisplayView()
      )
    }
    return (
      this.renderDefaultView()
    )
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
