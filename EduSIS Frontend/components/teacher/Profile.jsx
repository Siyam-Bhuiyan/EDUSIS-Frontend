import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export default function Profile() {
  const { colors, isDark, toggle } = useTheme();

  // Demo data
  const teacher = {
    name: "Dr. Smith",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    email: "smith@university.edu",
    phone: "+1 234 567 8900",
    office: "Room 405, CSE Building",
    avatar: require("../../assets/profile.jpg"),
    expertise: [
      "Computer Networks",
      "Database Systems",
      "Software Engineering",
    ],
    education: [
      {
        degree: "Ph.D in Computer Science",
        institution: "Stanford University",
        year: "2015",
      },
      {
        degree: "M.S. in Computer Science",
        institution: "MIT",
        year: "2010",
      },
    ],
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <MaterialIcons name={icon} size={20} color={colors.primary} />
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: colors.textDim }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <Image source={teacher.avatar} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{teacher.name}</Text>
        <Text style={[styles.department, { color: colors.textDim }]}>
          {teacher.department}
        </Text>
        <Text style={[styles.designation, { color: colors.primary }]}>
          {teacher.designation}
        </Text>
      </View>

      {/* Contact Information */}
      <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Contact Information
        </Text>
        <InfoRow icon="email" label="Email" value={teacher.email} />
        <InfoRow icon="phone" label="Phone" value={teacher.phone} />
        <InfoRow icon="location-on" label="Office" value={teacher.office} />
      </View>

      {/* Areas of Expertise */}
      <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Areas of Expertise
        </Text>
        <View style={styles.expertiseContainer}>
          {teacher.expertise.map((item, index) => (
            <View
              key={index}
              style={[styles.expertiseChip, { backgroundColor: colors.primary + '20' }]}
            >
              <Text style={[styles.expertiseText, { color: colors.primary }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Education */}
      <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Education
        </Text>
        {teacher.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={[styles.degree, { color: colors.text }]}>
              {edu.degree}
            </Text>
            <Text style={[styles.institution, { color: colors.textDim }]}>
              {edu.institution} • {edu.year}
            </Text>
          </View>
        ))}
      </View>

      {/* Theme Toggle */}
      <TouchableOpacity
        onPress={toggle}
        style={[styles.themeToggle, { backgroundColor: colors.cardBg }]}
      >
        <MaterialIcons
          name={isDark ? "light-mode" : "dark-mode"}
          size={24}
          color={colors.primary}
        />
        <Text style={[styles.themeToggleText, { color: colors.text }]}>
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  department: {
    fontSize: 16,
    marginBottom: 4,
  },
  designation: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
  },
  expertiseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  expertiseChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  expertiseText: {
    fontSize: 14,
    fontWeight: "600",
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  institution: {
    fontSize: 14,
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
