import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Calendar = () => {
  const events = [
    { id: 1, title: 'Networks Quiz', date: 'Aug 15 — 10:00 AM' },
    { id: 2, title: 'DB Project Submission', date: 'Aug 18 — 11:59 PM' },
    { id: 3, title: 'SE Midterm', date: 'Aug 27 — 9:00 AM' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Calendar</Text>
      {events.map((e) => (
        <View key={e.id} style={styles.card}>
          <Text style={styles.cardTitle}>{e.title}</Text>
          <Text style={styles.cardSub}>{e.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  title: { fontSize: 20, fontWeight: '700', color: '#2c3e50', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  cardSub: { fontSize: 13, color: '#7f8c8d', marginTop: 6 },
});
