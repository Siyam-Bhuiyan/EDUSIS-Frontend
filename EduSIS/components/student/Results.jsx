import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
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
      return "#10b981"; // Emerald
    case "A":
      return "#059669"; // Green
    case "A-":
      return "#34d399"; // Light emerald
    case "B+":
      return "#3b82f6"; // Blue
    case "B":
      return "#6366f1"; // Indigo
    case "B-":
      return "#8b5cf6"; // Purple
    case "C":
      return "#f59e0b"; // Amber
    case "D":
      return "#f97316"; // Orange
    case "F":
      return "#ef4444"; // Red
    default:
      return "#9ca3af"; // Gray
  }
};

const getGradeBackground = (grade) => {
  return getGradeColor(grade) + "15"; // Add transparency
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
  const gradeColor = grades ? getGradeColor(grades.grade) : colors.textDim;
  const gradeBgColor = grades ? getGradeBackground(grades.grade) : colors.bg;

  const selectedCourseInfo = useMemo(
    () => DEMO_COURSES.find((c) => c.course_id === selectedCourse),
    [selectedCourse]
  );

  const renderGradeCard = (
    title,
    icon,
    items,
    totalLabel,
    totalValue,
    color = colors.primary
  ) => (
    <View
      style={[
        styles.gradeCard,
        {
          backgroundColor: colors.card,
          borderLeftColor: color,
          shadowColor: colors.text,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, { backgroundColor: color + "15" }]}>
          <MaterialIcons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      </View>

      <View style={styles.cardContent}>
        {items.map((item, index) => (
          <View key={index} style={styles.gradeRow}>
            <Text style={[styles.gradeLabel, { color: colors.textDim }]}>
              {item.label}
            </Text>
            <Text style={[styles.gradeValue, { color: colors.text }]}>
              {item.value}
            </Text>
          </View>
        ))}

        {totalLabel && (
          <>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                {totalLabel}
              </Text>
              <Text style={[styles.totalValue, { color: color }]}>
                {totalValue}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={colors.isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Course Selection */}
        <View
          style={[
            styles.selectorCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.selectorHeader}>
            <MaterialIcons name="school" size={20} color={colors.primary} />
            <Text style={[styles.selectorTitle, { color: colors.text }]}>
              Select Course
            </Text>
          </View>

          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: colors.bg,
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
                  label={`${c.course_id} - ${c.title}`}
                  value={c.course_id}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Course Info & Results */}
        {grades ? (
          <>
            {/* Course Info Banner */}
            <View
              style={[
                styles.courseInfoBanner,
                {
                  backgroundColor: colors.primary + "10",
                  borderColor: colors.primary + "30",
                },
              ]}
            >
              <View style={styles.courseInfoContent}>
                <Text style={[styles.courseCode, { color: colors.primary }]}>
                  {selectedCourse}
                </Text>
                <Text style={[styles.courseTitle, { color: colors.text }]}>
                  {selectedCourseInfo?.title}
                </Text>
              </View>
              <View
                style={[
                  styles.totalScoreContainer,
                  { backgroundColor: gradeBgColor },
                ]}
              >
                <Text
                  style={[styles.totalScoreLabel, { color: colors.textDim }]}
                >
                  Total Score
                </Text>
                <Text style={[styles.totalScore, { color: gradeColor }]}>
                  {grades.total_marks}
                </Text>
              </View>
            </View>

            {/* Grade Cards */}
            <View style={styles.cardsContainer}>
              {renderGradeCard(
                "Quizzes",
                "quiz",
                [
                  { label: "Quiz 1", value: grades.quiz1_marks },
                  { label: "Quiz 2", value: grades.quiz2_marks },
                  { label: "Quiz 3", value: grades.quiz3_marks },
                ],
                "Best 3 Quizzes Total",
                quizTotal,
                "#3b82f6"
              )}

              {renderGradeCard(
                "Assignments & Attendance",
                "assignment",
                [
                  { label: "Assignments", value: grades.assignments_marks },
                  { label: "Attendance", value: grades.attendance_marks },
                ],
                null,
                null,
                "#8b5cf6"
              )}

              {renderGradeCard(
                "Major Examinations",
                "school",
                [
                  { label: "Mid Semester", value: grades.mid_sem_marks },
                  { label: "Final Semester", value: grades.final_sem_marks },
                ],
                null,
                null,
                "#f59e0b"
              )}

              {/* Final Grade Card */}
              <View
                style={[
                  styles.finalGradeCard,
                  {
                    backgroundColor: gradeBgColor,
                    borderColor: gradeColor,
                    shadowColor: gradeColor,
                  },
                ]}
              >
                <View style={styles.finalGradeHeader}>
                  <MaterialIcons
                    name="emoji-events"
                    size={32}
                    color={gradeColor}
                  />
                  <Text
                    style={[styles.finalGradeTitle, { color: colors.text }]}
                  >
                    Final Grade
                  </Text>
                </View>

                <View style={styles.finalGradeContent}>
                  <Text style={[styles.finalGradeValue, { color: gradeColor }]}>
                    {grades.grade}
                  </Text>
                  <Text
                    style={[styles.finalTotalMarks, { color: colors.textDim }]}
                  >
                    {grades.total_marks} / 120 Points
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyStateIcon,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialIcons
                name="assessment"
                size={48}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              Select a Course
            </Text>
            <Text style={[styles.emptyStateText, { color: colors.textDim }]}>
              Choose a course from the dropdown above to view your detailed
              academic results
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 12,
  },
  gradeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  gradeChipText: {
    fontSize: 16,
    fontWeight: "800",
  },

  // Content
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },

  // Course Selector
  selectorCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },

  // Course Info Banner
  courseInfoBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  courseInfoContent: {
    flex: 1,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalScoreContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  totalScoreLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  totalScore: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 4,
  },

  // Cards Container
  cardsContainer: {
    gap: 16,
  },

  // Grade Cards
  gradeCard: {
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardContent: {
    gap: 8,
  },
  gradeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  gradeLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  gradeValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
  },

  // Final Grade Card
  finalGradeCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 2,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 8,
  },
  finalGradeHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  finalGradeTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  finalGradeContent: {
    alignItems: "center",
  },
  finalGradeValue: {
    fontSize: 48,
    fontWeight: "900",
    marginBottom: 8,
  },
  finalTotalMarks: {
    fontSize: 14,
    fontWeight: "600",
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
