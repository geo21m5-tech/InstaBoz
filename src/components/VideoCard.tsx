import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, THEME } from '../constants/theme';

export interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  reward: number;
  duration: number;
  views?: number;
  onPress: () => void;
  style?: ViewStyle;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  reward,
  duration,
  views = 0,
  onPress,
  style,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={style}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
          <LinearGradient
            colors={['transparent', COLORS.primary]}
            style={styles.gradientOverlay}
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{formatDuration(duration)}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.footer}>
            <View style={styles.viewsContainer}>
              <MaterialIcons name="play-arrow" size={14} color={COLORS.textSecondary} />
              <Text style={styles.views}>{views.toLocaleString()} views</Text>
            </View>
            <LinearGradient
              colors={[COLORS.accent, COLORS.accentDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.rewardBadge}
            >
              <Text style={styles.rewardText}>${reward.toFixed(2)}</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.tertiary,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: THEME.spacing.sm,
    right: THEME.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
  },
  durationText: {
    color: COLORS.text,
    fontSize: THEME.fontSize.xs,
    fontWeight: '600',
  },
  content: {
    padding: THEME.spacing.md,
  },
  title: {
    color: COLORS.text,
    fontSize: THEME.fontSize.md,
    fontWeight: '600',
    marginBottom: THEME.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs,
  },
  views: {
    color: COLORS.textSecondary,
    fontSize: THEME.fontSize.xs,
  },
  rewardBadge: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
  },
  rewardText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: THEME.fontSize.sm,
  },
});
