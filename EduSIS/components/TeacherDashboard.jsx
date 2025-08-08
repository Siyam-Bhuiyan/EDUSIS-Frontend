import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeacherDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>
    </View>
  );
};

export default TeacherDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
  },
});
