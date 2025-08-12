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

export default function Calendar() {
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  // Demo data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Midterm Exam - Computer Networks",
      course: "CSE-301",
      date: "2024-02-20",
      time: "10:00 AM",
      description: "Chapters 1-5 will be covered",
      type: "exam",
    },
    {
      id: 2,
      title: "Database Project Presentation",
      course: "CSE-205",
      date: "2024-02-18",
      time: "2:30 PM",
      description: "Final project presentations by student groups",
      type: "presentation",
    },
    {
      id: 3,
      title: "Department Meeting",
      course: null,
      date: "2024-02-16",
      time: "1:00 PM",
      description: "Monthly faculty meeting",
      type: "meeting",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !time.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      course: "CSE-301", // Demo: hardcoded course
      date: date.trim(),
      time: time.trim(),
      description: description.trim(),
      type: "other",
    };

    setEvents([...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setShowForm(false);
  };

  const deleteEvent = (id) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setEvents(events.filter((e) => e.id !== id)),
        },
      ]
    );
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "exam":
        return "assignment";
      case "presentation":
        return "present-to-all";
      case "meeting":
        return "people";
      default:
        return "event";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowForm(true)}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>

      {/* Events List */}
      <ScrollView style={styles.list}>
        {events.map((event) => (
          <View
            key={event.id}
            style={[styles.card, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.cardHeader}>
              {event.course && (
                <View style={styles.courseChip}>
                  <MaterialIcons name="class" size={16} color={colors.primary} />
                  <Text
                    style={[styles.courseText, { color: colors.primary }]}
                  >
                    {event.course}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => deleteEvent(event.id)}
                style={styles.deleteBtn}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.eventHeader}>
              <MaterialIcons
                name={getEventIcon(event.type)}
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.eventTitle, { color: colors.text }]}>
                {event.title}
              </Text>
            </View>

            {event.description && (
              <Text style={[styles.description, { color: colors.textDim }]}>
                {event.description}
              </Text>
            )}

            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MaterialIcons
                  name="event"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  {event.date}
                </Text>
              </View>
              <View style={styles.detail}>
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  {event.time}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Event Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Add New Event
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
              placeholder="Event Title"
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
              placeholder="Description (optional)"
              placeholderTextColor={colors.textDim}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Add Event</Text>
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
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 13,
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