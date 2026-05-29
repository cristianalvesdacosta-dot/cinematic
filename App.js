import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraView from './src/components/CameraView';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Contour Camera</Text>
      <CameraView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 40 }
});
