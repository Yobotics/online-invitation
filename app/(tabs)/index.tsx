import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import type { TemplateType } from '@/components/templates/types';

const weddingDetails = {
  couple: ['Sarah', 'Michael'] as [string, string],
  date: 'JUNE 15 2024',
  time: '4:00 PM',
  venue: {
    name: 'The Grand Hotel',
    address: '123 Wedding Lane, City',
  },
  // Updated to use a valid royalty-free music URL
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

export default function InvitationScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');

  const templates = [
    {
      type: 'classic' as const,
      name: 'Classic',
      preview: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    },
    {
      type: 'elegant' as const,
      name: 'Elegant',
      preview: 'https://images.unsplash.com/photo-1523438885200-e5c615b8e62f',
    },
  ];

  const TemplateComponent = selectedTemplate === 'classic' ? ClassicTemplate : ElegantTemplate;

  return (
    <View style={styles.container}>
      <View style={styles.templateSelector}>
        <Text style={styles.selectorTitle}>Choose Your Template</Text>
        <View style={styles.templateGrid}>
          {templates.map((template) => (
            <Pressable
              key={template.type}
              style={[
                styles.templateOption,
                selectedTemplate === template.type && styles.selectedTemplate,
              ]}
              onPress={() => setSelectedTemplate(template.type)}>
              <Image source={{ uri: template.preview }} style={styles.templatePreview} />
              <Text style={[
                styles.templateName,
                selectedTemplate === template.type && styles.selectedTemplateName,
              ]}>
                {template.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      
      <View style={styles.templateContainer}>
        <TemplateComponent weddingDetails={weddingDetails} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  templateSelector: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  templateGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  templateOption: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTemplate: {
    borderColor: '#d4af37',
  },
  templatePreview: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  templateName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#fff',
  },
  selectedTemplateName: {
    color: '#d4af37',
  },
  templateContainer: {
    flex: 1,
  },
});