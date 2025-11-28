
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorText } from '../components/ui/ErrorText';
import { InputDropdown } from '../components/ui/InputDropdown';
import { InputField } from '../components/ui/InputField';
import { Colors } from '../constants/theme';
import { initializeApi, getBaseUrl } from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('realestate@i4sight.net');
  const [password, setPassword] = useState('django_user');
  const [country, setCountry] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [countryError, setCountryError] = useState('');
  const router = useRouter();

  const countries = [
    { label: 'India', value: 'ind' },
    { label: 'Kenya', value: 'ken' },
  ];

  const handleCountryChange = async (value: string) => {
    setCountry(value);
    try {
      await AsyncStorage.setItem('countryCode', value);
    } catch (error) {
      console.error('Error storing country code:', error);
    }
  };

  const handleLogin = async () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!country) {
      setCountryError('Country is required');
      isValid = false;
    } else {
      setCountryError('');
    }

    if (isValid) {
      try {
        await initializeApi(); // Initialize the BASE_URL
        const loginUrl = `${getBaseUrl()}/users/auth/token/`;
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        });

        const responseData = await response.json();

        if (response.ok) {
          await SecureStore.setItemAsync('userToken', responseData.token);
          
          const userData = { ...responseData };
          delete userData.token;

          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(userData)
          );

          router.replace('/dashboard');
        } else {
          if (responseData.errors && responseData.errors.non_field_errors) {
            setPasswordError(responseData.errors.non_field_errors[0]);
          } else {
            setPasswordError(
              responseData.message || 'An unknown error occurred.'
            );
          }
        }
      } catch (error) {
        console.error('Login request failed:', error);
        setPasswordError(
          'An error occurred during login. Please check your connection.'
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Global Guard</Text>
        <Text style={styles.subtitle}>Protection meets Precision</Text>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <InputField
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <ErrorText message={emailError} /> : null}
          <InputField
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <ErrorText message={passwordError} /> : null}
          <InputDropdown
            label="Choose your Country"
            items={countries}
            selectedValue={country}
            onValueChange={handleCountryChange}
          />
          {countryError ? <ErrorText message={countryError} /> : null}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.darkBlue,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.white,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.white,
    marginBottom: 40,
  },
  formContainer: {
    width: '85%',
    backgroundColor: Colors.light.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.light.darkBlue,
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: Colors.light.white,
    fontWeight: 'bold',
  },
});
