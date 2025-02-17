import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WeddingTemplateProps } from './types';

const { width } = Dimensions.get('window');

export default function ElegantTemplate({ weddingDetails }: WeddingTemplateProps) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: weddingDetails.musicUrl },
      { shouldPlay: true, isLooping: true }
    );
    setSound(sound);
    setIsPlaying(true);
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [firstName, lastName] = weddingDetails.couple;
  const [month, day, year] = weddingDetails.date.split(' ');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1523438885200-e5c615b8e62f' }}
          style={styles.headerImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.5)']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <Text style={styles.saveTheDate}>Save the Date</Text>
          <View style={styles.namesContainer}>
            <Text style={styles.names}>{firstName}</Text>
            <Text style={styles.and}>&</Text>
            <Text style={styles.names}>{lastName}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.year}>{year}</Text>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Ionicons name="heart" size={24} color="#d4af37" />
          <View style={styles.line} />
        </View>

        <Text style={styles.invitation}>
          With great joy,{'\n'}
          we invite you to share in our{'\n'}
          celebration of love
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={24} color="#d4af37" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Ceremony</Text>
              <Text style={styles.detailText}>{weddingDetails.time}</Text>
            </View>
          </View>
          
          <View style={styles.detailDivider} />
          
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={24} color="#d4af37" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Venue</Text>
              <Text style={styles.detailText}>{weddingDetails.venue.name}</Text>
              <Text style={styles.detailSubtext}>{weddingDetails.venue.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.flowerDivider}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1509719662282-b5c1d2482f85' }}
            style={styles.flowerImage}
          />
        </View>

        <Pressable
          style={styles.musicButton}
          onPress={isPlaying ? stopSound : playSound}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={32}
            color="#d4af37"
          />
          <Text style={styles.musicText}>
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 500,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveTheDate: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  namesContainer: {
    alignItems: 'center',
  },
  names: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  and: {
    color: '#d4af37',
    fontSize: 36,
    fontWeight: '300',
    marginVertical: 10,
  },
  content: {
    padding: 30,
    backgroundColor: '#fff',
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  month: {
    fontSize: 24,
    color: '#d4af37',
    letterSpacing: 4,
    fontWeight: '500',
  },
  day: {
    fontSize: 64,
    color: '#1a1a1a',
    fontWeight: '600',
    lineHeight: 70,
  },
  year: {
    fontSize: 24,
    color: '#666',
    letterSpacing: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#d4af37',
    marginHorizontal: 15,
  },
  invitation: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 40,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  detailSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  flowerDivider: {
    marginVertical: 40,
    height: 60,
    overflow: 'hidden',
  },
  flowerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  musicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 30,
  },
  musicText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#d4af37',
    fontWeight: '500',
  },
});