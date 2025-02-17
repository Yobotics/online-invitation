import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WeddingTemplateProps } from './types';

export default function ClassicTemplate({ weddingDetails }: WeddingTemplateProps) {
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

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed' }}
        style={styles.headerImage}
      />
      
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <Text style={styles.names}>{weddingDetails.couple.join(' & ')}</Text>
        <Text style={styles.date}>{weddingDetails.date}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.invitation}>
          Together with their families,{'\n'}
          request the pleasure of your company{'\n'}
          as they celebrate their marriage
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={24} color="#666" />
            <Text style={styles.detailText}>{weddingDetails.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={24} color="#666" />
            <Text style={styles.detailText}>{weddingDetails.venue.name}{'\n'}{weddingDetails.venue.address}</Text>
          </View>
        </View>

        <Pressable
          style={styles.musicButton}
          onPress={isPlaying ? stopSound : playSound}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={32}
            color="#666"
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
  headerImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 350,
    height: 50,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  names: {
    fontSize: 36,
    fontFamily: 'System',
    color: '#1a1a1a',
    marginTop: 20,
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    letterSpacing: 2,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  invitation: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 30,
  },
  details: {
    width: '100%',
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  musicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  musicText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
});