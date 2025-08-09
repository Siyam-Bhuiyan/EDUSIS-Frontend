import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import CourseCard from "./student/CourseCard";

export default function StudentDashboard() {
  // Demo data (with cover + teacher avatar)
  const courses = [
    {
      id: "CSE-301",
      title: "Computer Networks",
      teacher: "Ashraful Alam Khan",
      section: "Section 1 & 2",
      coverUri: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=60", // networks
      teacherAvatarUri:
        "https://cse.iutoic-dhaka.edu/uploads/img/1624511577_1067.jpg",
    },
    {
      id: "CSE-205",
      title: "Database Systems",
      teacher: "Ridwan Kabir",
      section: "Section 1 & 2",
      coverUri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=60", // database
      teacherAvatarUri:
        "https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg",
    },
    {
      id: "CSE-401",
      title: "Software Engineering",
      teacher: "Shohel Ahmed",
      section: "Section 1 & 2",
      coverUri: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1400&q=60", // code editor
      teacherAvatarUri:
        "https://cse.iutoic-dhaka.edu/uploads/img/1601106855_1128.jpg",
    },
    {
      id: "CSE-102",
      title: "Machine Learning",
      teacher: "Dr. Md Moniruzzaman",
      section: "Section 1 & 2",
      coverUri: "https://www.kdnuggets.com/wp-content/uploads/tayo_8_best_libraries_machine_learning_explained_1.jpg", // ML
      teacherAvatarUri:
        "https://cse.iutoic-dhaka.edu/uploads/img/1617768281_1035.png",
    },
    {
      id: "CSE-303",
      title: "Mobile App Development",
      teacher: "Mr. Davis",
      section: "Section E",
      coverUri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1400&q=60", 
      teacherAvatarUri:
        "https://cse.iutoic-dhaka.edu/uploads/img/1601107015_1938.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            courseID={c.id}
            courseTitle={c.title}
            teacherName={c.teacher}
            section={c.section}
            coverUri={c.coverUri}
            teacherAvatarUri={c.teacherAvatarUri}
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
