import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, THEME } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
}

const getVariantColors = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return [COLORS.accent, COLORS.accentDark];
    case 'secondary':
      return [COLORS.secondary, COLORS.tertiary];
    case 'danger':
      return [COLORS.error, '#d32f2f'];
    case 'success':
      return [COLORS.success, '#059669'];
    default:
      return [COLORS.accent, COLORS.accentDark];
  }
};

const getSizeStyles = (size: ButtonProps['size'] = 'medium') => {
  switch (size) {
    case 'small':
      return {
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        fontSize: THEME.fontSize.sm,
      };
    case 'large':
      return {
        paddingHorizontal: THEME.spacing.xl,
        paddingVertical: THEME.spacing.lg,
        fontSize: THEME.fontSize.lg,
      };
    default:
      return {
        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.md,
        fontSize: THEME.fontSize.md,
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  size = 'medium',
}) => {
  const sizeStyles = getSizeStyles(size);
  const colors = getVariantColors(variant);

  return (
    <LinearGradient
      colors={disabled ? [COLORS.tertiary, COLORS.tertiary] : colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      <TouchableOpacity
        disabled={disabled || loading}
        onPress={onPress}
        style={[
          styles.button,
          sizeStyles,
          (disabled || loading) && styles.disabledButton,
        ]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} size="small" />
        ) : (
          <Text style={[styles.text, sizeStyles, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: THEME.borderRadius.lg,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
