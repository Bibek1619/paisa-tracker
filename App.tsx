import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { seedAllData } from './src/utils/seedData';

// Main App Component (wrapped with AuthProvider)
const AppContent = () => {
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load seed data on first launch (for demo mode)
    if (!isAuthenticated) {
      loadSeedData();
    }
  }, [isAuthenticated]);

  const loadSeedData = async () => {
    try {
      await seedAllData();
      console.log('✅ Seed data loaded!');
    } catch (error) {
      console.log('Seed data already exists');
    }
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isAuthenticated ? <AppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <PaperProvider>
            <AppContent />
          </PaperProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});
