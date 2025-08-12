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

export default function Assignments() {
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("");

  // Demo data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Network Protocols Analysis",
      course: "CSE-301",
      description: "Analyze and compare TCP and UDP protocols",
      dueDate: "2024-02-20",
      points: 100,
      submissionsCount: 15,
      totalStudents: 30,
      status: "active",
    },
    {
      id: 2,
      title: "Database Schema Design",
      course: "CSE-205",
      description: "Design a normalized database schema for a library system",
      dueDate: "2024-02-18",
      points: 50,
      submissionsCount: 25,
      totalStudents: 28,
      status: "graded",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !dueDate.trim() || !points.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: title.trim(),
      course: "CSE-301", // Demo: hardcoded course
      description: description.trim(),
      dueDate: dueDate.trim(),
      points: parseInt(points),
      submissionsCount: 0,
      totalStudents: 30, // Demo data
      status: "active",
    };

    setAssignments([newAssignment, ...assignments]);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPoints("");
    setShowForm(false);
  };

  const deleteAssignment = (id) => {
    Alert.alert(
      "Delete Assignment",
      "Are you sure you want to delete this assignment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setAssignments(assignments.filter((a) => a.id !== id)),
        },
      ]
    );
  };

  const viewSubmissions = (assignment) => {
    // In a real app, this would navigate to submissions list
    Alert.alert(
      "View Submissions",
      `${assignment.submissionsCount} out of ${assignment.totalStudents} students have submitted`,
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
        <MaterialIcons name="assignment" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Create Assignment</Text>
      </TouchableOpacity>

      {/* Assignments List */}
      <ScrollView style={styles.list}>
        {assignments.map((assignment) => (
          <View
            key={assignment.id}
            style={[styles.card, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.courseChip}>
                <MaterialIcons name="class" size={16} color={colors.primary} />
                <Text
                  style={[styles.courseText, { color: colors.primary }]}
                >
                  {assignment.course}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteAssignment(assignment.id)}
                style={styles.deleteBtn}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={colors.danger}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.assignmentTitle, { color: colors.text }]}>
              {assignment.title}
            </Text>

            <Text style={[styles.description, { color: colors.textDim }]}>
              {assignment.description}
            </Text>

            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MaterialIcons
                  name="event"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  Due: {assignment.dueDate}
                </Text>
              </View>
              <View style={styles.detail}>
                <MaterialIcons
                  name="star"
                  size={16}
                  color={colors.textDim}
                />
                <Text style={[styles.detailText, { color: colors.textDim }]}>
                  {assignment.points} points
                </Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${(assignment.submissionsCount / assignment.totalStudents) * 100}%`,
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              style={[styles.viewButton, { backgroundColor: colors.primary }]}
              onPress={() => viewSubmissions(assignment)}
            >
              <MaterialIcons name="assignment-turned-in" size={20} color="#fff" />
              <Text style={styles.viewButtonText}>
                {assignment.status === "graded" ? "View Grades" : "View Submissions"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Create Assignment Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Create New Assignment
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
              placeholder="Assignment Title"
              placeholderTextColor={colors.textDim}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Description"
              placeholderTextColor={colors.textDim}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Due Date (YYYY-MM-DD)"
              placeholderTextColor={colors.textDim}
              value={dueDate}
              onChangeText={setDueDate}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Points"
              placeholderTextColor={colors.textDim}
              value={points}
              onChangeText={setPoints}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Assignment</Text>
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
  assignmentTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 13,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonText: {
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