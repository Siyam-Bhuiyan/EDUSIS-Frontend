import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import CourseCard from "./student/CourseCard";

export default function StudentDashboard() {
  // Demo data (no backend yet)
  const courses = [
    {
      id: "CSE-301",
      title: "Computer Networks",
      teacher: "Dr. Smith",
      designation: "Professor",
    },
    {
      id: "CSE-205",
      title: "Database Systems",
      teacher: "Prof. Johnson",
      designation: "Associate Professor",
    },
    {
      id: "CSE-401",
      title: "Software Engineering",
      teacher: "Dr. Williams",
      designation: "Assistant Professor",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      {/* keeps content below the OS status bar */}
      <StatusBar style="light" backgroundColor="#1e90ff" />
      <ScrollView contentContainerStyle={styles.content}>
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            courseID={c.id}
            courseTitle={c.title}
            teacherName={c.teacher}
            teacherDesignation={c.designation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5f7fa" },
  content: { padding: 14 },
});
