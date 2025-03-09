import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import "../global.css";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryProvider';

SplashScreen.preventAutoHideAsync();

const customTheme = {
  colors: {
    primary: '#FF5722', // Change purple to orange
    accent: '#FF9800',  // Accent color
    background: '#FFF', // Background color
    surface: '#FFFFFF',  // Card background
    text: '#212121',     // Text color
    onSurface: '#000000', // Icon color
    error: '#E53935',     // Vibrant red for error
    onError: '#FFFFFF',   // Text color on error background
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready] = useFonts({
    SapceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={customTheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </PaperProvider >
    </QueryClientProvider>
  )
}
