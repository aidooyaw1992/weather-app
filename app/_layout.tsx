import theme, { Theme } from "@/theme";
import { ThemeProvider } from '@shopify/restyle';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from "react";
import { Appearance, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Promise.all([
          new Promise<void>((resolve) => {
            if (fontsLoaded || fontError) {
              resolve();
            }
          })
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Don't render anything until everything is ready
  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return null;
  }
  const darkTheme: Theme = {
    ...theme,
  }

  const colorScheme = Appearance.getColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }} onLayout={onLayoutRootView}>
        <ThemeProvider theme={colorScheme == 'dark' ? darkTheme : theme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </View>
    </GestureHandlerRootView>
  )
}
