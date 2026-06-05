// App Header with Profile and Theme Toggle

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemedColors } from '../../hooks/useThemedColors';
import { SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';

interface AppHeaderProps {
  title?: string;
  showProfile?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = 'PaisaTrack Nepal',
  showProfile = true 
}) => {
  const { toggleTheme, isDark } = useTheme();
  const COLORS = useThemedColors();

  return (
    <View style={[styles.container, { backgroundColor: COLORS.white }]}>
      <View style={styles.leftSection}>
        {showProfile && (
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=2563EB&color=fff&size=128' }}
            style={styles.avatar}
          />
        )}
        <Text style={[styles.title, { color: COLORS.primary }]}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        {/* Theme Toggle */}
        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: COLORS.background }]}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={isDark ? 'sunny' : 'moon'} 
            size={20} 
            color={COLORS.text}
          />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: COLORS.background }]}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
