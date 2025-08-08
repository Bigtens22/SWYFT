import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import COLORS from '../../constants/colors';
import GlassmorphicContainer from '../../components/GlassmorphicContainer';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

type RegisterDetailsScreenRouteProp = RouteProp<
  AuthStackParamList,
  'RegisterDetails'
>;

type Props = {
  route: RegisterDetailsScreenRouteProp;
};

const RegisterDetailsScreen: React.FC<Props> = ({ route }) => {
  const { role } = route.params;

  // Common fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Driver-specific fields
  const [state, setState] = useState('');
  const [school, setSchool] = useState('');
  const [campusLocation, setCampusLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  // Business-specific fields
  const [businessName, setBusinessName] = useState('');
  const [productCategories, setProductCategories] = useState('');

  const handleRegister = async () => {
    if (email === '' || password === '' || fullName === '') {
        Alert.alert('Invalid Input', 'Please fill all required fields.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = {
            role,
            fullName,
            email,
            ...(role === 'Driver' && { state, school, campusLocation, vehicleType }),
            ...(role === 'Delivery and Pick up' && { businessName, productCategories, campusLocation }),
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        console.log('User registered and data saved:', user.uid);

    } catch (error: any) {
        Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register as {role}</Text>

        <GlassmorphicContainer style={styles.formContainer}>
          {/* Common Fields */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Role-Specific Fields */}
          {role === 'Driver' && (
            <>
              <TextInput style={styles.input} placeholder="State" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={state} onChangeText={setState} />
              <TextInput style={styles.input} placeholder="School" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={school} onChangeText={setSchool} />
              <TextInput style={styles.input} placeholder="Campus Location" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={campusLocation} onChangeText={setCampusLocation} />
              <TextInput style={styles.input} placeholder="Vehicle Type" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={vehicleType} onChangeText={setVehicleType} />
            </>
          )}

          {role === 'Delivery and Pick up' && (
            <>
              <TextInput style={styles.input} placeholder="Business Name" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={businessName} onChangeText={setBusinessName} />
              <TextInput style={styles.input} placeholder="Campus Location" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={campusLocation} onChangeText={setCampusLocation} />
              <TextInput style={styles.input} placeholder="Product Categories (comma separated)" placeholderTextColor="rgba(255, 255, 255, 0.7)" value={productCategories} onChangeText={setProductCategories} />
            </>
          )}

        </GlassmorphicContainer>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryGradientEnd,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: COLORS.white,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primaryGradientStart,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterDetailsScreen;
