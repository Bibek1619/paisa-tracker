import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { isFirebaseConfigured } from '../config/firebase';

// Demo mode - works without Firebase
class AuthService {
  async getCurrentUser(): Promise<User | null> {
    if (!isFirebaseConfigured) {
      // Demo mode
      const userData = await AsyncStorage.getItem('demo_user');
      return userData ? JSON.parse(userData) : null;
    }
    // TODO: Implement Firebase auth check
    return null;
  }

  async login(email: string, password: string): Promise<User> {
    if (!isFirebaseConfigured) {
      // Demo mode - auto login
      const user: User = {
        id: 'demo-user',
        email,
        name: email.split('@')[0],
        createdAt: new Date(),
      };
      await AsyncStorage.setItem('demo_user', JSON.stringify(user));
      return user;
    }
    // TODO: Implement Firebase login
    throw new Error('Firebase not configured');
  }

  async register(email: string, password: string, name: string): Promise<User> {
    if (!isFirebaseConfigured) {
      // Demo mode - auto register
      const user: User = {
        id: 'demo-user',
        email,
        name,
        createdAt: new Date(),
      };
      await AsyncStorage.setItem('demo_user', JSON.stringify(user));
      return user;
    }
    // TODO: Implement Firebase registration
    throw new Error('Firebase not configured');
  }

  async logout(): Promise<void> {
    if (!isFirebaseConfigured) {
      await AsyncStorage.removeItem('demo_user');
      return;
    }
    // TODO: Implement Firebase logout
  }
}

export const authService = new AuthService();
