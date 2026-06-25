import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, THEME } from '../constants/theme';
import { VideoCard } from '../components/VideoCard';
import { usePayPal } from '../services/PayPalService';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  reward: number;
  duration: number;
  views: number;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Travel Vlog: Tokyo Adventures',
    thumbnail: 'https://via.placeholder.com/400x225?text=Tokyo',
    reward: 0.50,
    duration: 480,
    views: 15420,
  },
  {
    id: '2',
    title: 'Tech Review: Latest Smartphone',
    thumbnail: 'https://via.placeholder.com/400x225?text=Tech+Review',
    reward: 0.75,
    duration: 600,
    views: 28930,
  },
  {
    id: '3',
    title: 'Cooking Tutorial: Italian Pasta',
    thumbnail: 'https://via.placeholder.com/400x225?text=Cooking',
    reward: 0.60,
    duration: 540,
    views: 9320,
  },
  {
    id: '4',
    title: 'Gaming: Battle Royale Highlights',
    thumbnail: 'https://via.placeholder.com/400x225?text=Gaming',
    reward: 0.55,
    duration: 720,
    views: 42150,
  },
];

export const HomeScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [earnings, setEarnings] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const paypal = usePayPal();

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    try {
      const total = await paypal.getTotalEarnings();
      setEarnings(total);
    } catch (error) {
      console.error('Error loading earnings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEarnings();
    setRefreshing(false);
  };

  const handleVideoPress = (videoId: string) => {
    console.log('Video pressed:', videoId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome to BozVid</Text>
          <Text style={styles.subtitle}>Watch videos, earn money</Text>
        </View>
        <View style={styles.earningsContainer}>
          <MaterialIcons name="trending-up" size={32} color={COLORS.accent} />
          <View style={styles.earningsText}>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <Text style={styles.earningsAmount}>${earnings.toFixed(2)}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Videos</Text>
          <MaterialIcons name="sort" size={24} color={COLORS.textSecondary} />
        </View>

        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <VideoCard
              {...item}
              onPress={() => handleVideoPress(item.id)}
              style={styles.videoCard}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
    borderBottomLeftRadius: THEME.borderRadius.xl,
    borderBottomRightRadius: THEME.borderRadius.xl,
  },
  headerContent: {
    marginBottom: THEME.spacing.xl,
  },
  greeting: {
    color: COLORS.text,
    fontSize: THEME.fontSize.xxxl,
    fontWeight: 'bold',
    marginBottom: THEME.spacing.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: THEME.fontSize.md,
  },
  earningsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
  },
  earningsText: {
    flex: 1,
  },
  earningsLabel: {
    color: COLORS.textSecondary,
    fontSize: THEME.fontSize.sm,
    marginBottom: 4,
  },
  earningsAmount: {
    color: COLORS.accent,
    fontSize: THEME.fontSize.xxl,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: THEME.fontSize.xl,
    fontWeight: 'bold',
  },
  listContent: {
    gap: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xl,
  },
  videoCard: {
    marginBottom: THEME.spacing.md,
  },
});
