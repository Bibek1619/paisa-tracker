import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { seedAllData } from './src/utils/seedData';

export default function App() {
  useEffect(() => {
    // Load seed data on first launch
    loadSeedData();
  }, []);

  const loadSeedData = async () => {
    try {
      await seedAllData();
      console.log('✅ Seed data loaded!');
    } catch (error) {
      console.log('Seed data already exists');
    }
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
