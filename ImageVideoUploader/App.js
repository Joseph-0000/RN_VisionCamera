import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageUploader from './ImageUploader';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageUploader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
