// Login Screen with Firebase Authentication

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedColors } from '../hooks/useThemedColors';
import { loginUser, registerUser } from '../services/authService';
import { SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

export const LoginScreen = ({ navigation }: any) => {
  const COLORS = useThemedColors();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && !name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await loginUser(email, password);
        Alert.alert('Success', 'Logged in successfully!');
      } else {
        await registerUser(email, password, name);
        Alert.alert('Success', 'Account created successfully!');
      }
      // Navigation will happen automatically through auth state listener
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <View style={styles.content}>
        {/* Logo/Title */}
        <View style={styles.header}>
          <Ionicons name="wallet" size={64} color={COLORS.primary} />
          <Text style={[styles.title, { color: COLORS.text }]}>
            PaisaTrack Nepal
          </Text>
          <Text style={[styles.subtitle, { color: COLORS.textSecondary }]}>
            Track Your Paisa, Achieve Your Goals
          </Text>
        </View>

        {/* Form */}
        <View style={[styles.form, { backgroundColor: COLORS.white }]}>
          <Text style={[styles.formTitle, { color: COLORS.text }]}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Text>

          {/* Name Input (Register only) */}
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
              <TextInput
                style={[styles.input, { color: COLORS.text }]}
                placeholder="Full Name"
                placeholderTextColor={COLORS.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={[styles.input, { color: COLORS.text }]}
              placeholder="Email"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={[styles.input, { color: COLORS.text }]}
              placeholder="Password"
              placeholderTextColor={COLORS.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Login' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle Login/Register */}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={[styles.toggleText, { color: COLORS.textSecondary }]}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View style={styles.demoInfo}>
            <Text style={[styles.demoText, { color: COLORS.textSecondary }]}>
              Demo: test@paisatrack.com / password123
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  form: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    fontSize: FONT_SIZES.md,
  },
  button: {
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: FONT_SIZES.sm,
  },
  demoInfo: {
    marginTop: SPACING.lg,
    padding: SPACING.sm,
    backgroundColor: '#FEF3C7',
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  demoText: {
    fontSize: FONT_SIZES.xs,
  },
});
