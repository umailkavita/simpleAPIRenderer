const OPEN_WEATHER_API_KEY = "your.api.key.goes.here"

export const fetchWeatherMapFromAPI = async (city) => {
  try {
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`,
    );
    let json = await response.json();
    //converting into easily readable object for my screen
    const renderedData = {
      city: json.name,
      weather: json.weather[0], //weather comes in array, considering the first object out of it
      temparature: {
        currentTemp: json.main.temp,
        minTemp: json.main.temp_min,
        maxTemp: json.main.temp_max,
      },
    };
    return renderedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
