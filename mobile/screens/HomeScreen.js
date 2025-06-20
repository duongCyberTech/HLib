import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  console.log("Home Page")
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // màu nền sáng
  },
  text: {
    fontSize: 22,
    color: '#000', // chữ màu đen
  },
});
