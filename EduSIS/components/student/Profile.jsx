import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Helper to format ISO/string dates as DD/MM/YYYY
const formatDate = (dateString) => {
  try {
    const d = new Date(dateString);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return dateString || "Not Available";
  }
};

export default function Profile() {
  const { colors, isDark } = useTheme();

  // ===== Dummy student data (replace with API later) =====
  const student = useMemo(
    () => ({
      name: "Siyam Bhuiyan",
      student_id: "210041215",
      program: "BSc in CSE",
      semester: "6th",
      cgpa: "2.99",
      credits_earned: 92,
      email: "siyam.bhuiyan@example.edu",
      phone_number: "+880-1711-000000",
      address: "Dhaka, Bangladesh 1205",
      date_of_birth: "2003-02-14",
      blood_group: "O+",
      emergency_contact: {
        name: "Ms Bhuiyan",
        relationship: "Mother",
        phone: "+880-1811-111111",
      },
      country: "Bangladesh",
      avatar: require("../../assets/profile.jpg"),
    }),
    []
  );

  const statsCards = [
    {
      icon: "graduation-cap",
      label: "CGPA",
      value: student.cgpa,
      color: "#4CAF50",
    },
    {
      icon: "book-reader",
      label: "Credits",
      value: student.credits_earned,
      color: "#2196F3",
    },
    {
      icon: "calendar-alt",
      label: "Semester",
      value: student.semester,
      color: "#9C27B0",
    },
  ];

  const sections = [
    {
      title: "Academic Information",
      icon: "university",
      items: [
        { label: "Department", value: student.department },
        { label: "Program", value: student.program },
        { label: "Student ID", value: student.student_id },
      ],
    },
    {
      title: "Personal Information",
      icon: "user",
      items: [
        { label: "Father's Name", value: "Richard Doe" },
        { label: "Mother's Name", value: "Jane Doe" },
        { label: "Date of Birth", value: formatDate(student.date_of_birth) },
        { label: "Blood Group", value: student.blood_group },
        { label: "Country", value: student.country },
      ],
    },
    {
      title: "Contact Information",
      icon: "address-book",
      items: [
        { label: "Email", value: student.email, icon: "envelope" },
        { label: "Phone", value: student.phone_number, icon: "phone" },
        { label: "Address", value: student.address, icon: "map-marker-alt" },
      ],
    },
    {
      title: "Emergency Contact",
      icon: "first-aid",
      items: [
        { label: "Name", value: student.emergency_contact?.name },
        {
          label: "Relationship",
          value: student.emergency_contact?.relationship,
        },
        { label: "Phone", value: student.emergency_contact?.phone },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Profile Header */}
      <LinearGradient
        colors={isDark ? ["#1a2234", "#2d3748"] : ["#1e90ff", "#6fb1fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <Image source={student.avatar} style={styles.avatar} />
          <View style={styles.onlineIndicator} />
        </View>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.role}>{student.department}</Text>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {statsCards.map((stat, index) => (
          <View
            key={stat.label}
            style={[styles.statCard, { backgroundColor: colors.cardBg }]}
          >
            <FontAwesome5 name={stat.icon} size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textDim }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Information Sections */}
      <View style={styles.sectionsContainer}>
        {sections.map((section, sIndex) => (
          <View
            key={section.title}
            style={[styles.sectionCard, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.sectionHeader}>
              <FontAwesome5
                name={section.icon}
                size={16}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {section.title}
              </Text>
            </View>
            {section.items.map((item, iIndex) => (
              <View
                key={item.label}
                style={[
                  styles.infoRow,
                  {
                    backgroundColor: isDark
                      ? iIndex % 2 === 0
                        ? "rgba(255,255,255,0.03)"
                        : "transparent"
                      : iIndex % 2 === 0
                      ? "rgba(0,0,0,0.02)"
                      : "transparent",
                  },
                ]}
              >
                <Text style={[styles.infoLabel, { color: colors.textDim }]}>
                  {item.label}
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {item.value || "Not Available"}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.8)",
  },
  onlineIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    borderWidth: 2.5,
    borderColor: "#fff",
    position: "absolute",
    bottom: 4,
    right: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  quickActionsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionsContainer: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
    marginTop: 16,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
  },
});
