import { Box } from "@/components/Box";
import CurrentWeatherIcon from "@/components/CurrentWeatherIcon";
import StyledRadioGroup from "@/components/StyledRadioGroup";
import { StyledText } from "@/components/StyledText";
import WeatherListItem from "@/components/WeatherListItem";
import { useAppTheme } from "@/providers/ThemeProvider";
import { locationService } from "@/services/LocationService";
import { useWeatherStore } from "@/store/useWeatherStore";
import { Theme } from "@/theme";
import { LocationResult } from "@/types";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from "@shopify/restyle";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

export default function Index() {

  const theme = useTheme<Theme>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { toggleTheme, colorScheme } = useAppTheme();

  const handleThemeSelect = useCallback(() => {
    if (colorScheme == 'dark') {
      toggleTheme('light');
    } else {
      toggleTheme('dark');
    }
  }, [toggleTheme, colorScheme]);


  const handleMenuPress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const formatWeatherDateTime = (weatherData: any) => {
    if (!weatherData?.current?.dt) return 'Loading...';
    const date = new Date(weatherData.current.dt * 1000);
    const timezone = weatherData.timezone || 'UTC';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      hour12: true,
      timeZone: timezone
    });
  };

  const formatCurrentDateTime = (timezone: string) => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      hour12: true,
      timeZone: timezone
    });
  };

  const isValidLocationResult = (location: any): location is LocationResult => {
    return (
      location &&
      typeof location === 'object' &&
      location.coords &&
      typeof location.coords.latitude === 'number' &&
      typeof location.coords.longitude === 'number' &&
      typeof location.city === 'string' &&
      typeof location.country === 'string'
    );
  };

  const tempCelsius = (kelvin: any) => Math.round(kelvin);

  const { weatherData, isLoading, error, fetchWeatherData, refreshWeatherData, setLocation: setStoreLocation } = useWeatherStore();

  type LocationKey = 'accra' | 'new-york' | 'london' | 'khartoum'

  const predefinedLocations: { [K in LocationKey]: LocationResult } = {
    'accra': {
      coords: {
        latitude: 5.6431,
        longitude: -0.2447,
      },
      city: 'Accra',
      country: 'Ghana'
    },
    'new-york': {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
      city: 'New York',
      country: 'United States'
    },
    'london': {
      coords: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
      city: 'London',
      country: 'United Kingdom'
    },
    'khartoum': {
      coords: {
        latitude: 15.5007,
        longitude: 32.5599,
      },
      city: 'Khartoum',
      country: 'Sudan'
    }
  };

  const [location, setLocation] = useState(predefinedLocations['accra'])

  const handleSetCurrentLocation = () => {
    bottomSheetRef.current?.close();
    locationService.hasLocationPermission().then((hasPermission) => {
      if (hasPermission) {
        locationService.getCurrentLocation().then((value) => {

          if (isValidLocationResult(value)) {
            setLocation(value)
            setStoreLocation(value)
            fetchWeatherData(value.coords.latitude, value.coords.longitude).then(() => {
              toast.success('retrieved successfully', {
                position: 'bottom-center'
              })
            })

          }
        })
          .catch(err => {
            console.log(err);
            toast.error('Failed to get current location');
          })
      } else {
        toast.info('no permission available, requesting..')
        locationService.requestPermissions().then(permission => {
          if (permission.granted) {

            locationService.getCurrentLocation().then((value) => {

              if (isValidLocationResult(value)) {
                setLocation(value)
                setStoreLocation(value)
                fetchWeatherData(value.coords.latitude, value.coords.longitude).then(() => {
                  toast.success('retrieved successfully', {
                    position: 'bottom-center'
                  })
                })

              }
            })
              .catch(err => {
                console.log(err);
                toast.error('Failed to get current location');
              })
          }
        })
          .catch(e => {
            toast.error('Failed to request permission', {
              position: 'bottom-center'
            });
            console.log('err req perm', e);
          })
      }

    })


  }

  const handleRetry = useCallback(() => {
    fetchWeatherData(location.coords.latitude, location.coords.longitude);
  }, [location.coords.latitude, location.coords.longitude]);


  const handlePredefinedLocationSelected = (id: string) => {
    setLocation(predefinedLocations[id as LocationKey])
    bottomSheetRef.current?.close();
  }

  useEffect(() => {

    fetchWeatherData(location.coords.latitude, location.coords.longitude)
  }, [location.coords.latitude, location.coords.longitude,]);

  // Loading State
  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}>
        <Box flex={1} justifyContent="center" alignItems="center" gap="m">
          <ActivityIndicator size="large" color={theme.colors.appGrey800} />
          <StyledText color="text" fontSize={16}>
            Getting weather data...
          </StyledText>
        </Box>
      </SafeAreaView>
    );
  }

  // Error State
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}>
        <Box flex={1} justifyContent="center" alignItems="center" gap="m" paddingHorizontal="l">
          <Feather name="cloud-off" size={64} color={theme.colors.textSubdued} />
          <StyledText textAlign="center" fontSize={18} fontFamily="Nunito-SemiBold">
            Weather Unavailable
          </StyledText>
          <StyledText textAlign="center" color="textSubdued" fontSize={16}>
            {error}
          </StyledText>
          <Pressable
            onPress={handleRetry}
            style={{
              backgroundColor: theme.colors.mainBackground,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 8
            }}
          >
            <StyledText color="appWhite" fontFamily="Nunito-SemiBold">
              Try Again
            </StyledText>
          </Pressable>
        </Box>
      </SafeAreaView>
    );
  }

  // Success State - Your existing content
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}>
      <StatusBar barStyle={colorScheme == 'light' ? 'dark-content' : 'default'} />

      <Box flex={1} marginHorizontal="m" marginTop="m" backgroundColor="mainBackground">
        <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box style={{ position: 'relative' }}>
            <StyledText variant="header" fontSize={24}>
              {`${location.city}, ${location.country}`}
            </StyledText>
            <StyledText color="textSubdued" fontSize={18}>
              {weatherData?.timezone ?
                formatCurrentDateTime(weatherData.timezone) :
                formatWeatherDateTime(weatherData)
              }
            </StyledText>
          </Box>
          <Box flexDirection="row" gap="s">

            <Pressable onPress={handleThemeSelect}>
              <Feather name={colorScheme == 'dark' ? 'moon' : 'sun'} size={28} color={theme.colors.appGray} />
            </Pressable>
            <Pressable onPress={handleMenuPress}>
              <Feather name="menu" size={28} color={theme.colors.appGray} />
            </Pressable>
          </Box>
        </Box>

        <Box alignItems="center" justifyContent="center">
          <CurrentWeatherIcon weatherId={weatherData?.current.weather[0].id} />
          <StyledText textAlign="center" variant="header" fontSize={64}>
            {tempCelsius(weatherData?.current.temp)}°
          </StyledText>
          <StyledText color="textSubdued" fontFamily="Nunito-SemiBold" fontSize={24}>
            {weatherData?.current.weather[0].description}
          </StyledText>
        </Box>

        <Box flex={1} backgroundColor="secondaryBackground" borderRadius="m" marginTop="m" padding="m" gap="s">
          <StyledText fontFamily="Nunito-Bold" fontSize={20}>This week</StyledText>
          <FlatList
            data={weatherData?.daily}
            renderItem={({ item }) => <WeatherListItem listItem={item} />}
            style={styles.weatherList}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Box>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        // snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <BottomSheetView style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.secondaryBackground }
        ]}>
          <Box alignItems="flex-start" gap="s" padding="m">
            <Pressable onPress={handleSetCurrentLocation} style={styles.currentLocationBtn} >
              <StyledText fontSize={16} color="whiteText" fontFamily="Nunito-SemiBold" textAlign="center">Set Current Locations</StyledText>
            </Pressable>

            <StyledText fontSize={16} textAlign="center">Select Predefined Locations</StyledText>
            <StyledRadioGroup
              onItemSelected={handlePredefinedLocationSelected}
              radioItems={[
                { name: 'Accra', value: 'accra', id: 'accra' },
                { name: 'London', value: 'london', id: 'london' },
                { name: 'New York', value: 'new-york', id: 'new-york' },
                { name: 'Khartoum', value: 'khartoum', id: 'khartoum' },
              ]}
            />
          </Box>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  weatherList: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
  animation: {
    width: 120,
    height: 120,
  },

  currentLocationBtn: {
    backgroundColor: 'blue',
    width: '100%',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16
  }
});