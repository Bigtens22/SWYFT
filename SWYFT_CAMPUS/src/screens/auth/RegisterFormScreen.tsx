import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS, FONTS } from '../../constants/theme';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

type ScreenRouteProp = RouteProp<AuthStackParamList, 'RegisterForm'>;
type Props = { route: ScreenRouteProp };

const RegisterFormScreen: React.FC<Props> = ({ route }) => {
  const { role } = route.params;

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Student fields
  const [studentId, setStudentId] = useState('');
  const [campusName, setCampusName] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');

  // Driver fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  // Business fields
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState(''); // Note: name is common
  const [businessType, setBusinessType] = useState('');
  const [campusLocation, setCampusLocation] = useState('');
  const [operatingHours, setOperatingHours] = useState('');

  const handleRegister = async () => {
    if (email === '' || name === '' || phone === '' || password === '') {
        Alert.alert('Error', 'Please fill all required fields.');
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            role,
            name,
            email,
            phone,
            // Add other fields based on role
        };

        await setDoc(doc(db, "users", user.uid), userData);
        // Auth state listener will handle navigation
    } catch (error: any) {
        Alert.alert('Registration Error', error.message);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'Student':
        return (
          <>
            <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} />
            <TextInput style={styles.input} placeholder="Campus Name" value={campusName} onChangeText={setCampusName} />
            <TextInput style={styles.input} placeholder="Department" value={department} onChangeText={setDepartment} />
            <TextInput style={styles.input} placeholder="Year of Study" value={yearOfStudy} onChangeText={setYearOfStudy} keyboardType="numeric" />
            <TouchableOpacity style={styles.uploadButton}><Text style={styles.buttonText}>Upload Student ID Photo</Text></TouchableOpacity>
          </>
        );
      case 'Driver':
        return (
          <>
            <TextInput style={styles.input} placeholder="License Number" value={licenseNumber} onChangeText={setLicenseNumber} />
            <TextInput style={styles.input} placeholder="Vehicle Type" value={vehicleType} onChangeText={setVehicleType} />
            <TextInput style={styles.input} placeholder="Vehicle Plate" value={vehiclePlate} onChangeText={setVehiclePlate} />
            <TouchableOpacity style={styles.uploadButton}><Text style={styles.buttonText}>Upload Driver’s License</Text></TouchableOpacity>
          </>
        );
      case 'Business':
        return (
          <>
            <TextInput style={styles.input} placeholder="Business Name" value={businessName} onChangeText={setBusinessName} />
            <TextInput style={styles.input} placeholder="Business Type (e.g., Restaurant)" value={businessType} onChangeText={setBusinessType} />
            <TextInput style={styles.input} placeholder="Campus Location" value={campusLocation} onChangeText={setCampusLocation} />
            <TextInput style={styles.input} placeholder="Operating Hours (e.g., 9am - 5pm)" value={operatingHours} onChangeText={setOperatingHours} />
            <TouchableOpacity style={styles.uploadButton}><Text style={styles.buttonText}>Upload CAC Document</Text></TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton}><Text style={styles.buttonText}>Upload Logo</Text></TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register as a {role}</Text>
        <TextInput style={styles.input} placeholder={role === 'Business' ? "Owner's Name" : "Full Name"} value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TouchableOpacity style={styles.uploadButton}><Text style={styles.buttonText}>Upload Profile Photo</Text></TouchableOpacity>

        {renderRoleSpecificFields()}

        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Complete Registration</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    ...FONTS.body,
  },
  uploadButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 15,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    ...FONTS.body,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default RegisterFormScreen;
