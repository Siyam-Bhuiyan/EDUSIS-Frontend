import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CourseCard({ courseID, courseTitle, teacherName, teacherDesignation }) {
  return (
    <View style={styles.card}>
      {/* Top row: course info + icon */}
      <View style={styles.header}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseID}>{courseID}</Text>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <Text style={styles.section}>Section 1 & 2</Text>
        </View>
        <MaterialIcons name="school" size={26} color="#1e90ff" />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom row: teacher info */}
      <View style={styles.footer}>
        <Text style={styles.teacherName}>{teacherName}</Text>
        <Text style={styles.teacherDesignation}>{teacherDesignation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  courseInfo: { flex: 1, paddingRight: 8 },
  courseID: { fontSize: 14, fontWeight: "800", color: "#1e90ff" },
  courseTitle: { fontSize: 16, fontWeight: "700", color: "#2c3e50", marginTop: 2 },
  section: { fontSize: 13, color: "#7f8c8d", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#ecf0f1", marginVertical: 6 },
  footer: { marginTop: 4 },
  teacherName: { fontSize: 14, fontWeight: "600", color: "#34495e" },
  teacherDesignation: { fontSize: 12, color: "#7f8c8d", marginTop: 2 },
});
