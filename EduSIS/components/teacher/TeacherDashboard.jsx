import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import TeacherCourseCard from "./TeacherCourseCard";
import TopBar from "../layout/TopBar";
import { useNavigation } from "@react-navigation/native";

export default function TeacherDashboard() {
  const { colors, isDark, toggle } = useTheme();
  const navigation = useNavigation();

  // Demo data (with cover + teacher avatar)
  const courses = [
    {
      id: "CSE-301",
      title: "Computer Networks",
      section: "Section 1 & 2",
      students: 45,
      coverUri: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=60",
      teacherAvatarUri: "https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg",
    },
    {
      id: "CSE-205",
      title: "Database Systems",
      section: "Section 1 & 2",
      students: 40,
      coverUri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=60",
      teacherAvatarUri: "https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg",
    },
    {
      id: "CSE-401",
      title: "Software Engineering",
      section: "Section 1 & 2",
      students: 38,
      coverUri: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1400&q=60",
      teacherAvatarUri: "https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg",
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {courses.map((c) => (
          <TeacherCourseCard
            key={c.id}
            courseID={c.id}
            courseTitle={c.title}
            section={c.section}
            students={c.students}
            coverUri={c.coverUri}
            teacherAvatarUri={c.teacherAvatarUri}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f5f7fa" },
  content: { padding: 14 },
});