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

export default function OnlineClasses() {
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  // Demo data
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Computer Networks - Chapter 5",
      course: "CSE-301",
      date: "2024-02-15",
      time: "10:00 AM",
      duration: "1.5 hours",
      status: "upcoming",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      title: "Database Design Principles",
      course: "CSE-205",
      date: "2024-02-14",
      time: "2:30 PM",
      duration: "2 hours",
      status: "completed",
      meetingUrl: "https://meet.google.com/xyz-uvwx-yz",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !time.trim() || !duration.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newClass = {
      id: Date.now(),
      title: title.trim(),
      course: "CSE-301", // Demo: hardcoded course
      date: date.trim(),
      time: time.trim(),
      duration: duration.trim(),
      status: "upcoming",
      meetingUrl: `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
    };

    setClasses([newClass, ...classes]);
    setTitle("");
    setDate("");
    setTime("");
    setDuration("");
    setShowForm(false);
  };

  const deleteClass = (id) => {
    Alert.alert(
      "Delete Class",
      "Are you sure you want to delete this class?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setClasses(classes.filter((c) => c.id !== id)),
        },
      ]
    );
  };

  const startClass = (meetingUrl) => {
    // In a real app, this would integrate with video conferencing API
    Alert.alert(
      "Start Class",
      `Starting virtual classroom...\n\nMeeting URL: ${meetingUrl}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowForm(true)}
      >
        <MaterialIcons name="video-call" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Schedule Class</Text>
      </TouchableOpacity>

      {/* Classes List */}
      <ScrollView style={styles.list}>
        {classes.map((cls) => (
          <View
            key={cls.id}
            style={[styles.card, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.courseChip}>
                <MaterialIcons name="class" size={16} color={colors.primary} />
                <Text
                  style={[styles.courseText, { color: colors.primary }]}
                >
                  {cls.course}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteClass(cls.id)}
                style={styles.deleteBtn}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.classTitle, { color: colors.text }]}>
              {cls.title}
            </Text>

            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MaterialIcons
                  name="event"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  {cls.date}
                </Text>
              </View>
              <View style={styles.detail}>
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  {cls.time} ({cls.duration})
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={() => startClass(cls.meetingUrl)}
            >
              <MaterialIcons name="video-call" size={20} color="#fff" />
              <Text style={styles.startButtonText}>
                {cls.status === "upcoming" ? "Start Class" : "View Recording"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Schedule Class Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Schedule New Class
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
              placeholder="Class Title"
              placeholderTextColor={colors.textDim}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Date (YYYY-MM-DD)"
              placeholderTextColor={colors.textDim}
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Time (e.g. 10:00 AM)"
              placeholderTextColor={colors.textDim}
              value={time}
              onChangeText={setTime}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Duration (e.g. 1.5 hours)"
              placeholderTextColor={colors.textDim}
              value={duration}
              onChangeText={setDuration}
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Schedule Class</Text>
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
    alignItems: "center",
    marginBottom: 12,
  },
  courseChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#e8f4ff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  courseText: {
    fontSize: 12,
    fontWeight: "600",
  },
  deleteBtn: {
    padding: 4,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 13,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    borderRadius: 6,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
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