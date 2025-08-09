import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../theme/ThemeProvider";

const DEMO_COURSES = [
  { course_id: "CSE-301", title: "Computer Networks" },
  { course_id: "CSE-205", title: "Database Systems" },
  { course_id: "CSE-401", title: "Software Engineering" },
];

// Per-course demo grades (shape mirrors your web component)
const DEMO_GRADES = {
  "CSE-301": {
    quiz1_marks: 9,
    quiz2_marks: 8,
    quiz3_marks: 10,
    assignments_marks: 18,
    attendance_marks: 8,
    mid_sem_marks: 24,
    final_sem_marks: 36,
    total_marks: 103,
    grade: "A",
  },
  "CSE-205": {
    quiz1_marks: 7,
    quiz2_marks: 9,
    quiz3_marks: 6,
    assignments_marks: 16,
    attendance_marks: 10,
    mid_sem_marks: 20,
    final_sem_marks: 32,
    total_marks: 90,
    grade: "B+",
  },
  "CSE-401": {
    quiz1_marks: 10,
    quiz2_marks: 10,
    quiz3_marks: 8,
    assignments_marks: 19,
    attendance_marks: 9,
    mid_sem_marks: 26,
    final_sem_marks: 38,
    total_marks: 120,
    grade: "A+",
  },
};

const getGradeColor = (grade) => {
  switch (grade) {
    case "A+":
      return "#00FF00"; // Green
    case "A":
      return "#66FF66"; // Light Green
    case "A-":
      return "#00FF4C"; // Lighter Green
    case "B+":
      return "#00FF62"; // Even Lighter Green
    case "B":
      return "#A26600"; // Yellowish
    case "B-":
      return "#F26600"; // Light Orange
    case "C":
      return "#FFC800"; // Orange
    case "D":
      return "#FF6A00"; // Light Red
    case "F":
      return "#FF0000"; // Red
    default:
      return "#DDDDDD";
  }
};

// Grab all quiz* fields, sort desc, take best 3, sum.
const getTopThreeQuizzesTotal = (g) => {
  if (!g) return 0;
  const entries = Object.entries(g)
    .filter(([k, v]) => /^quiz\d+_marks$/.test(k) && typeof v === "number")
    .map(([, v]) => v);

  if (entries.length === 0) return 0;
  return entries
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, n) => sum + n, 0);
};

export default function Results() {
  const { colors } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState("");

  const grades = useMemo(
    () => (selectedCourse ? DEMO_GRADES[selectedCourse] : null),
    [selectedCourse]
  );

  const quizTotal = useMemo(() => getTopThreeQuizzesTotal(grades), [grades]);
  const borderClr = grades ? getGradeColor(grades.grade) : "#ecf0f1";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={[styles.title, { color: colors.text }]}>Results</Text>

      {/* Course Picker */}
      <View
        style={[
          styles.selectWrap,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
          },
        ]}
      >
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(v) => setSelectedCourse(v)}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.primary}
        >
          <Picker.Item label="-- Choose a Course --" value="" />
          {DEMO_COURSES.map((c) => (
            <Picker.Item
              key={c.course_id}
              label={`${c.course_id}: ${c.title}`}
              value={c.course_id}
            />
          ))}
        </Picker>
      </View>

      {/* Breakdown cards */}
      {grades ? (
        <View style={styles.cardsWrap}>
          <Text style={styles.sectionHeading}>Grades for {selectedCourse}</Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Quizzes
            </Text>
            <Text style={styles.rowText}>Quiz 1: {grades.quiz1_marks}</Text>
            <Text style={styles.rowText}>Quiz 2: {grades.quiz2_marks}</Text>
            <Text style={styles.rowText}>Quiz 3: {grades.quiz3_marks}</Text>
            <View style={styles.divider} />
            <Text style={[styles.rowText, styles.em]}>
              Total of Best 3 Quizzes: {quizTotal}
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Assignments & Attendance
            </Text>
            <Text style={styles.rowText}>
              Assignments: {grades.assignments_marks}
            </Text>
            <Text style={styles.rowText}>
              Attendance: {grades.attendance_marks}
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Mid & Final
            </Text>
            <Text style={styles.rowText}>Mid: {grades.mid_sem_marks}</Text>
            <Text style={styles.rowText}>Final: {grades.final_sem_marks}</Text>
          </View>

          <View
            style={[
              styles.card,
              styles.totalCard,
              { borderColor: borderClr },
            ]}
          >
            <Text style={styles.cardTitle}>Total Marks & Grade</Text>
            <Text style={styles.rowText}>
              Total Marks: {grades.total_marks}
            </Text>
            <Text style={[styles.rowText, styles.gradeText]}>
              Grade: {grades.grade}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.hint}>
          Pick a course to view your detailed grades.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  selectWrap: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: { height: 55 },

  cardsWrap: { gap: 12 },
  sectionHeading: { fontSize: 16, fontWeight: "700" },

  card: {
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    borderWidth: 1,
  },
  totalCard: { borderWidth: 2 },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },
  rowText: { fontSize: 14, marginTop: 4 },
  em: { fontWeight: "800", color: "#1e90ff" },

  gradeText: { fontWeight: "800" },
  divider: { height: 1, backgroundColor: "#ecf0f1", marginVertical: 8 },

  hint: { marginTop: 12, color: "#7f8c8d" },
});
