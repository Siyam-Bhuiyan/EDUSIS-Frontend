import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const events = [
  { id: 1, title: "Networks Quiz", date: "Aug 15 — 10:00 AM", tag: "Quiz" },
  { id: 2, title: "DB Project Submission", date: "Aug 18 — 11:59 PM", tag: "Deadline" },
  { id: 3, title: "SE Midterm", date: "Aug 27 — 9:00 AM", tag: "Exam" },
];

const tagStyle = (tag) => {
  switch (tag) {
    case "Quiz":
      return { bg: "#eef7ff", fg: "#1e90ff" };
    case "Deadline":
      return { bg: "#fff4ec", fg: "#f97316" };
    case "Exam":
      return { bg: "#f2fff7", fg: "#10b981" };
    default:
      return { bg: "#f3f4f6", fg: "#374151" };
  }
};

export default function Calendar() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Calendar</Text>

      {events.map((e) => {
        const [mon, day] = e.date.split(" ")[0] === "Aug"
          ? ["AUG", e.date.match(/\d+/)?.[0] || ""]
          : [e.date.slice(0, 3).toUpperCase(), e.date.match(/\d+/)?.[0] || ""];

        const t = tagStyle(e.tag);

        return (
          <TouchableOpacity key={e.id} activeOpacity={0.9} style={styles.card}>
            {/* Left date badge */}
            <View style={styles.dateBox}>
              <Text style={styles.month}>{mon}</Text>
              <Text style={styles.day}>{day}</Text>
            </View>

            {/* Info */}
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.cardTitle}>{e.title}</Text>
              <View style={styles.row}>
                <MaterialIcons name="schedule" size={14} color="#6b7280" />
                <Text style={styles.cardSub}>{e.date}</Text>
                {!!e.tag && (
                  <Text style={[styles.tag, { backgroundColor: t.bg, color: t.fg }]}>
                    {e.tag}
                  </Text>
                )}
              </View>
            </View>

            {/* Chevron */}
            <MaterialIcons name="chevron-right" size={22} color="#a3b1c2" />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const CARD_R = 12;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  title: { fontSize: 20, fontWeight: "800", color: "#1f2a37", marginBottom: 12 },

  card: {
    backgroundColor: "#fff",
    borderRadius: CARD_R,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  dateBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  month: { color: "#ffffffcc", fontSize: 12, fontWeight: "800", letterSpacing: 0.5 },
  day: { color: "#fff", fontSize: 18, fontWeight: "900" },

  cardTitle: { fontSize: 16, fontWeight: "800", color: "#1f2a37" },
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  cardSub: { fontSize: 12.5, color: "#6b7280" },

  tag: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
  },
});
