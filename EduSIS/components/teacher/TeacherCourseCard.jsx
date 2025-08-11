import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function TeacherCourseCard({
  courseID,
  courseTitle,
  section = "Section 1",
  students = 0,
  coverUri,
  teacherAvatarUri
}) {
  const navigation = useNavigation();
  const src = coverUri
    ? { uri: coverUri }
    : { uri: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1200&q=60" };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.card} 
      onPress={() => navigation.navigate('TeacherCourseDetail', {
        courseID,
        courseTitle,
        section,
        students,
        coverUri
      })}
    >
      <ImageBackground source={src} style={styles.cover} imageStyle={styles.coverImg}>
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)"]}
          style={StyleSheet.absoluteFill}
        />                                                                                                                
        <View style={styles.coverTopRow}>
          <View style={styles.idChip}>
            <MaterialIcons name="bookmark-border" size={20} color="#fff" />
            <Text style={styles.idChipText}>{courseID}</Text>
          </View>
          <View style={styles.studentsChip}>
            <MaterialIcons name="people" size={18} color="#fff" />
            <Text style={styles.studentsText}>{students} Students</Text>
          </View>
        </View>

        <Text numberOfLines={1} style={styles.title}>{courseTitle}</Text>
        {!!teacherAvatarUri && (
          <Image
            source={{ uri: teacherAvatarUri }}
            style={styles.teacher70}
          />
        )}
      </ImageBackground>
      <View style={styles.body}>
        <Text style={styles.section}>{section}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <MaterialIcons name="assignment" size={16} color="#1e90ff" />
            <Text style={styles.statText}>4 Assignments</Text>
          </View>
          <View style={styles.stat}>
            <MaterialIcons name="event" size={16} color="#1e90ff" />
            <Text style={styles.statText}>2 Upcoming</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cover: {
    height: 130,
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  coverImg: { resizeMode: "cover" },
  coverTopRow: {
    position: "absolute",
    top: 14,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  idChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  idChipText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  studentsChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  studentsText: { color: "#fff", fontSize: 12 },
  title: { color: "#fff", fontSize: 18, fontWeight: "900", letterSpacing: 0.2 },

  teacher70: {
    position: "absolute",
    right: 19,
    top: 20,
    width: 70,
    height: 70,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  body: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  section: { fontSize: 14, color: "#0e2038ff", fontWeight: "600" },
  statsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#1e90ff",
    fontWeight: "600",
  },
});