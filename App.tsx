import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { PayPalProvider } from './src/services/PayPalService';
import { AuthProvider } from './src/context/AuthContext';
import { COLORS } from './src/constants/theme';

export default function App() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(COLORS.primary);
  }, []);

  return (
    <AuthProvider>
      <PayPalProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PayPalProvider>
    </AuthProvider>
  );
}
