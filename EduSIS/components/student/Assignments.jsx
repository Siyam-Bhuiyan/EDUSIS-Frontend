import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Assignments = () => {
  const items = [
    { id: 1, title: 'DBMS Project Proposal', due: 'Aug 18, 11:59 PM', status: 'Pending' },
    { id: 2, title: 'Networks Quiz Prep', due: 'Aug 15, 10:00 AM', status: 'Upcoming' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Assignments</Text>
      {items.map((it) => (
        <View key={it.id} style={styles.card}>
          <Text style={styles.cardTitle}>{it.title}</Text>
          <Text style={styles.cardSub}>Due: {it.due}</Text>
          <Text style={styles.badge}>{it.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Assignments;

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
  badge: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#1e90ff' },
});
