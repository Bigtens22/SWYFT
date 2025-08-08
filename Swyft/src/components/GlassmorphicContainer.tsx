import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import COLORS from '../constants/colors';

interface GlassmorphicContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const GlassmorphicContainer: React.FC<GlassmorphicContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
        style={StyleSheet.absoluteFill}
      />
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default GlassmorphicContainer;
