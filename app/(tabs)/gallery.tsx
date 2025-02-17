import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 30;

export default function GalleryScreen() {
  const photos = [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6',
    'https://images.unsplash.com/photo-1519741497674-611481863552',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gallery}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: photo }}
              style={styles.image}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gallery: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 1.5,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});