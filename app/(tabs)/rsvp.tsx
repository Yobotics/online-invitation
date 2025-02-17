import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RSVPScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!name || !email || attending === null) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // TODO: Implement RSVP submission to backend
    Alert.alert('Success', 'Thank you for your RSVP!');
    
    // Reset form
    setName('');
    setEmail('');
    setGuests('');
    setMessage('');
    setAttending(null);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#f8f9fa', '#fff']}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>RSVP</Text>
        <Text style={styles.subtitle}>Please respond by May 15, 2024</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Will you attend? *</Text>
            <View style={styles.attendanceButtons}>
              <Pressable
                style={[
                  styles.attendanceButton,
                  attending === true && styles.attendanceButtonActive,
                ]}
                onPress={() => setAttending(true)}>
                <Text style={[
                  styles.attendanceButtonText,
                  attending === true && styles.attendanceButtonTextActive,
                ]}>
                  Joyfully Accept
                </Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.attendanceButton,
                  attending === false && styles.attendanceButtonActive,
                ]}
                onPress={() => setAttending(false)}>
                <Text style={[
                  styles.attendanceButtonText,
                  attending === false && styles.attendanceButtonTextActive,
                ]}>
                  Regretfully Decline
                </Text>
              </Pressable>
            </View>
          </View>

          {attending && (
            <View style={styles.field}>
              <Text style={styles.label}>Number of Guests</Text>
              <TextInput
                style={styles.input}
                value={guests}
                onChangeText={setGuests}
                placeholder="Enter number of guests"
                keyboardType="number-pad"
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Message (Optional)</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Leave a message for the couple"
              multiline
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit RSVP</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  attendanceButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  attendanceButtonActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  attendanceButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  attendanceButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});