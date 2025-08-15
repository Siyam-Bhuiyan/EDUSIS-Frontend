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
    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate.trim() ||
      !points.trim()
    ) {
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Assignments
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textDim }]}>
            Create and manage student assignments
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowForm(true)}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.createButtonText}>New Assignment</Text>
        </TouchableOpacity>
      </View>

      {/* Assignments List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {assignments.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment" size={64} color={colors.textDim} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Assignments Created
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textDim }]}>
              Create your first assignment to get started
            </Text>
          </View>
        ) : (
          assignments.map((assignment) => (
            <View
              key={assignment.id}
              style={[
                styles.assignmentCard,
                { backgroundColor: colors.cardBg },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.assignmentInfo}>
                  <View
                    style={[
                      styles.courseBadge,
                      { backgroundColor: colors.primary + "15" },
                    ]}
                  >
                    <Text
                      style={[styles.courseCode, { color: colors.primary }]}
                    >
                      {assignment.course}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          assignment.status === "active"
                            ? "#fef3c7"
                            : "#dcfce7",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            assignment.status === "active"
                              ? "#d97706"
                              : "#16a34a",
                        },
                      ]}
                    >
                      {assignment.status}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteAssignment(assignment.id)}
                  style={styles.deleteButton}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={18}
                    color="#ef4444"
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={[styles.assignmentTitle, { color: colors.text }]}
                numberOfLines={2}
              >
                {assignment.title}
              </Text>

              <Text
                style={[styles.description, { color: colors.textDim }]}
                numberOfLines={2}
              >
                {assignment.description}
              </Text>

              <View style={styles.assignmentDetails}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <MaterialIcons name="schedule" size={16} color="#6b7280" />
                  </View>
                  <Text style={[styles.detailText, { color: colors.textDim }]}>
                    Due {assignment.dueDate}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <MaterialIcons name="stars" size={16} color="#6b7280" />
                  </View>
                  <Text style={[styles.detailText, { color: colors.textDim }]}>
                    {assignment.points} points
                  </Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressInfo}>
                  <Text
                    style={[styles.progressLabel, { color: colors.textDim }]}
                  >
                    Submissions
                  </Text>
                  <Text style={[styles.progressCount, { color: colors.text }]}>
                    {assignment.submissionsCount}/{assignment.totalStudents}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { backgroundColor: colors.inputBg },
                    ]}
                  >
                    <View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: colors.primary,
                          width: `${
                            (assignment.submissionsCount /
                              assignment.totalStudents) *
                            100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.viewButton, { backgroundColor: colors.primary }]}
                onPress={() => viewSubmissions(assignment)}
              >
                <MaterialIcons name="visibility" size={18} color="#fff" />
                <Text style={styles.viewButtonText}>
                  {assignment.status === "graded"
                    ? "View Grades"
                    : "View Submissions"}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Create Assignment Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Create Assignment
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.textDim }]}>
                  Add a new assignment for students
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowForm(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={20} color={colors.textDim} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Title
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.inputBg, color: colors.text },
                  ]}
                  placeholder="Enter assignment title"
                  placeholderTextColor={colors.textDim}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Description
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    { backgroundColor: colors.inputBg, color: colors.text },
                  ]}
                  placeholder="Enter assignment description"
                  placeholderTextColor={colors.textDim}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Due Date
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.inputBg, color: colors.text },
                    ]}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={colors.textDim}
                    value={dueDate}
                    onChangeText={setDueDate}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Points
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.inputBg, color: colors.text },
                    ]}
                    placeholder="100"
                    placeholderTextColor={colors.textDim}
                    value={points}
                    onChangeText={setPoints}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { backgroundColor: colors.inputBg },
                ]}
                onPress={() => setShowForm(false)}
              >
                <Text
                  style={[styles.cancelButtonText, { color: colors.textDim }]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleSubmit}
              >
                <MaterialIcons name="assignment" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Create Assignment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },

  // List Styles
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Assignment Card Styles
  assignmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  assignmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  courseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  assignmentDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  progressCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f3f4f6",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  textArea: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minHeight: 80,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  submitButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
