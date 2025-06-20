import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppNavigator from './navigations/AppNavigator';

export default function App() {
  console.log('App component is rendering');
  return (
      <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
