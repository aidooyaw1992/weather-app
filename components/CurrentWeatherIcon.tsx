import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';



const WEATHER_ASSETS = {
  sunny: require('../assets/lotties/weather-sunny.json'),
  cloudy: require('../assets/lotties/weather-cloudy-night.json'),
  rainy: require('../assets/lotties/weather-rainy.json'),
  storm: require('../assets/lotties/weather-storm.json'),
  snow: require('../assets/lotties/weather-snow.json'),
  mist: require('../assets/lotties/weather-windy.json'),
} as const;


type WeatherAssetKey = keyof typeof WEATHER_ASSETS;


interface CurrentWeatherIconProps {
  weatherId?: number;
  size?: number;
  style?: ViewStyle;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
}

const CurrentWeatherIcon: React.FC<CurrentWeatherIconProps> = ({
  weatherId,
  size = 120,
  style,
  autoPlay = true,
  loop = true,
  speed = 1,
}) => {
  const getWeatherAsset = (weatherId?: number): WeatherAssetKey => {

    if (!weatherId) return 'sunny';
      
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    
    // Drizzle
    if (weatherId >= 300 && weatherId < 400) return 'rainy';
    
    // Rain
    if (weatherId >= 500 && weatherId < 600) return 'rainy';
    
    // Snow
    if (weatherId >= 600 && weatherId < 700) return 'snow';
    
    // Atmosphere (mist, fog, haze, etc.)
    if (weatherId >= 700 && weatherId < 800) return 'mist';
    
    // Clear sky
    if (weatherId === 800) return 'sunny';
    
    // Clouds
    if (weatherId >= 801 && weatherId <= 804) return 'mist';
    
    // Fallback
    return 'sunny';
  };

  const weatherAssetKey = getWeatherAsset(weatherId);
  const animationSource = WEATHER_ASSETS[weatherAssetKey];

  const animationStyle = [
    styles.animation,
    { width: size, height: size },
    style,
  ];

  return (
    <LottieView
      source={animationSource}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      style={animationStyle}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});

export default CurrentWeatherIcon;