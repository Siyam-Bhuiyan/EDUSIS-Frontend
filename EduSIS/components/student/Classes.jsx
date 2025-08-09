import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Classes = () => {
  const schedule = [
    {
      id: 1,
      course: "Computer Networks",
      time: "Today — 2:00 PM",
      room: "Online (Zoom)",
    },
    {
      id: 2,
      course: "Database Systems",
      time: "Tomorrow — 11:00 AM",
      room: "Room C-201",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={styles.title}>Classes</Text>
      {schedule.map((c) => (
        <View key={c.id} style={styles.card}>
          <Text style={styles.cardTitle}>{c.course}</Text>
          <Text style={styles.cardLine}>{c.time}</Text>
          <Text style={styles.cardLine}>{c.room}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Classes;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#2c3e50" },
  cardLine: { fontSize: 13, color: "#7f8c8d", marginTop: 6 },
});
