import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Results = () => {
  const rows = [
    { id: 1, course: 'Computer Networks', grade: 'A-' },
    { id: 2, course: 'Database Systems', grade: 'B+' },
    { id: 3, course: 'Software Engineering', grade: 'A' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Results</Text>
      {rows.map((r) => (
        <View key={r.id} style={styles.card}>
          <Text style={styles.cardTitle}>{r.course}</Text>
          <Text style={styles.cardGrade}>{r.grade}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  title: { fontSize: 20, fontWeight: '700', color: '#2c3e50', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  cardGrade: { fontSize: 16, fontWeight: '800', color: '#1e90ff' },
});
