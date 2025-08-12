import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export default function Announcements() {
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Demo data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Quiz Next Week",
      content: "Prepare for Quiz on Chapter 5: Network Protocols",
      course: "CSE-301",
      date: "2024-02-15",
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "Project Submission Guidelines",
      content: "Please follow the updated guidelines for final project submission",
      course: "CSE-205",
      date: "2024-02-14",
      time: "2:30 PM",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      course: "CSE-301", // Demo: hardcoded course
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  const deleteAnnouncement = (id) => {
    Alert.alert(
      "Delete Announcement",
      "Are you sure you want to delete this announcement?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setAnnouncements(announcements.filter((a) => a.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowForm(true)}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>New Announcement</Text>
      </TouchableOpacity>

      {/* Announcements List */}
      <ScrollView style={styles.list}>
        {announcements.map((announcement) => (
          <View
            key={announcement.id}
            style={[styles.card, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {announcement.title}
                </Text>
                <Text style={[styles.cardMeta, { color: colors.textDim }]}>
                  {announcement.course} • {announcement.date} at{" "}
                  {announcement.time}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteAnnouncement(announcement.id)}
                style={styles.deleteBtn}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.cardContent, { color: colors.text }]}>
              {announcement.content}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Announcement Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                New Announcement
              </Text>
              <TouchableOpacity onPress={() => setShowForm(false)}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.textDim}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Announcement Title"
              placeholderTextColor={colors.textDim}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Announcement Content"
              placeholderTextColor={colors.textDim}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Post Announcement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: "#666",
  },
  deleteBtn: {
    padding: 4,
  },
  cardContent: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: "#1e90ff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});