import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator / splash screen
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
