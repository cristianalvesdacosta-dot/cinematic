import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CameraView() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    // Mock IA detection
    const interval = setInterval(() => {
      setObjects([
        { type: 'car', confidence: 0.92 },
        { type: 'person', confidence: 0.88 }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.camera}>
      <Text style={styles.text}>📷 Camera Preview (mock)</Text>

      <View style={styles.overlay}>
        {objects.map((obj, index) => (
          <Text key={index} style={styles.label}>
            {obj.type.toUpperCase()} - {Math.round(obj.confidence * 100)}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  text: { color: '#fff', marginBottom: 10 },
  overlay: { position: 'absolute', top: 100 },
  label: { color: '#0f0', margin: 5 }
});
