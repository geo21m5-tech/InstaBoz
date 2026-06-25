import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { COLORS, THEME } from '../constants/theme';

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Coming Soon</Text>
        <Text style={styles.subtitle}>Account settings and preferences</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
  },
  title: {
    color: COLORS.text,
    fontSize: THEME.fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.md,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: THEME.fontSize.md,
    textAlign: 'center',
  },
});
