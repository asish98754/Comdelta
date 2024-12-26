import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyTabs from './navigation/indextab';
import Welcome from './src/welcome';
import Task2TableOrg from './src/pdfddmo';
import FTrail from './src/finaltrail';
import NewPdf from './src/task2';
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MyTabs />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
