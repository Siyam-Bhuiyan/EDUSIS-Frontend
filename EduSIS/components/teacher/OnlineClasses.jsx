// components/teacher/OnlineClasses.jsx
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
  Linking,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";

export default function OnlineClasses() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false); // the “join in app / browser” prompt
  const [selectedMeeting, setSelectedMeeting] = useState(null);

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
      meetingUrl: "https://meet.jit.si/edusis-CSE-301-ch05",
    },
    {
      id: 2,
      title: "Database Design Principles",
      course: "CSE-205",
      date: "2024-02-14",
      time: "2:30 PM",
      duration: "2 hours",
      status: "completed",
      meetingUrl: "https://meet.jit.si/edusis-CSE-205-dbdesign",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !time.trim() || !duration.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const room = `edusis-${Math.random().toString(36).slice(2, 9)}`;
    const url = `https://meet.jit.si/${room}`;

    const newClass = {
      id: Date.now(),
      title: title.trim(),
      course: "CSE-301",
      date: date.trim(),
      time: time.trim(),
      duration: duration.trim(),
      status: "upcoming",
      meetingUrl: url,
    };

    setClasses([newClass, ...classes]);
    setTitle("");
    setDate("");
    setTime("");
    setDuration("");
    setShowForm(false);
  };

  const deleteClass = (id) => {
    Alert.alert("Delete Class", "Are you sure you want to delete this class?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setClasses((x) => x.filter((c) => c.id !== id)),
      },
    ]);
  };

  const onStartPress = (cls) => {
    setSelectedMeeting(cls);
    setPickerOpen(true);
  };

  const joinInApp = () => {
    if (!selectedMeeting) return;
    setPickerOpen(false);
    // Minimal params (you can pass subject/user too)
    navigation.navigate("JitsiMeetingScreen", {
      room: selectedMeeting.meetingUrl.replace("https://meet.jit.si/", ""),
      subject: selectedMeeting.title,
      user: { name: "Dr. Smith" },
    });
  };

  const joinInBrowser = async () => {
    if (!selectedMeeting) return;
    setPickerOpen(false);
    // Try device browser. Fallback to Linking.
    const url = selectedMeeting.meetingUrl;
    try {
      const res = await WebBrowser.openBrowserAsync(url);
      if (res.type !== "opened") await Linking.openURL(url);
    } catch {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Online Classes
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textDim }]}>
            Manage your virtual sessions
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.scheduleButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowForm(true)}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.scheduleButtonText}>New Class</Text>
        </TouchableOpacity>
      </View>


      {/* Classes List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {classes.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="video-call" size={64} color={colors.textDim} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Classes Scheduled
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textDim }]}>
              Tap "New Class" to schedule your first online session
            </Text>
          </View>
        ) : (
          classes.map((cls) => (
            <View
              key={cls.id}
              style={[styles.classCard, { backgroundColor: colors.cardBg }]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.courseSection}>
                  <View
                    style={[
                      styles.courseBadge,
                      { backgroundColor: colors.primary + "15" },
                    ]}
                  >
                    <Text
                      style={[styles.courseCode, { color: colors.primary }]}
                    >
                      {cls.course}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          cls.status === "upcoming" ? "#fef3c7" : "#dcfce7",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            cls.status === "upcoming" ? "#d97706" : "#16a34a",
                        },
                      ]}
                    >
                      {cls.status}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteClass(cls.id)}
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
                style={[styles.classTitle, { color: colors.text }]}
                numberOfLines={2}
              >
                {cls.title}
              </Text>

              <View style={styles.classDetails}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#6b7280"
                    />
                  </View>
                  <Text style={[styles.detailText, { color: colors.textDim }]}>
                    {cls.date}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <MaterialIcons
                      name="access-time"
                      size={16}
                      color="#6b7280"
                    />
                  </View>
                  <Text style={[styles.detailText, { color: colors.textDim }]}>
                    {cls.time}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.detailIcon}>
                    <MaterialIcons name="timer" size={16} color="#6b7280" />
                  </View>
                  <Text style={[styles.detailText, { color: colors.textDim }]}>
                    {cls.duration}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.joinButton, { backgroundColor: colors.primary }]}
                onPress={() => onStartPress(cls)}
              >
                <MaterialIcons name="videocam" size={18} color="#fff" />
                <Text style={styles.joinButtonText}>Start Class</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Schedule Class Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Schedule New Class
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.textDim }]}>
                  Create a new online session
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
                  Class Title
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.inputBg, color: colors.text },
                  ]}
                  placeholder="Enter class title"
                  placeholderTextColor={colors.textDim}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Date
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.inputBg, color: colors.text },
                    ]}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={colors.textDim}
                    value={date}
                    onChangeText={setDate}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={[styles.inputLabel, { color: colors.text }]}>
                    Time
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.inputBg, color: colors.text },
                    ]}
                    placeholder="10:00 AM"
                    placeholderTextColor={colors.textDim}
                    value={time}
                    onChangeText={setTime}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Duration
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.inputBg, color: colors.text },
                  ]}
                  placeholder="e.g. 1.5 hours"
                  placeholderTextColor={colors.textDim}
                  value={duration}
                  onChangeText={setDuration}
                />
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
                <MaterialIcons name="videocam" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Schedule Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Join Options Modal */}
      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <View style={styles.joinOverlay}>
          <View style={[styles.joinModal, { backgroundColor: colors.cardBg }]}>
            <View style={styles.joinHeader}>
              <View style={styles.joinIconContainer}>
                <MaterialIcons
                  name="videocam"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.joinTitle, { color: colors.text }]}>
                Join Meeting
              </Text>
              <Text style={[styles.joinSubtitle, { color: colors.textDim }]}>
                Choose how to join the class
              </Text>
            </View>

            <View style={styles.joinOptions}>
              <TouchableOpacity
                style={[styles.joinOptionButton, styles.primaryOption]}
                onPress={joinInApp}
              >
                <MaterialIcons name="smartphone" size={20} color="#fff" />
                <Text style={styles.primaryOptionText}>Join in App</Text>
                <Text style={styles.optionDescription}>
                  Recommended for better experience
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.joinOptionButton, styles.secondaryOption]}
                onPress={joinInBrowser}
              >
                <MaterialIcons
                  name="open-in-browser"
                  size={20}
                  color="#6b7280"
                />
                <Text
                  style={[styles.secondaryOptionText, { color: colors.text }]}
                >
                  Join in Browser
                </Text>
                <Text
                  style={[styles.optionDescription, { color: colors.textDim }]}
                >
                  Open in web browser
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelJoinButton}
              onPress={() => setPickerOpen(false)}
            >
              <Text style={[styles.cancelJoinText, { color: colors.textDim }]}>
                Cancel
              </Text>
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
  scheduleButton: {
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
  scheduleButtonText: {
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

  // Class Card Styles
  classCard: {
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
  courseSection: {
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
  classTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 24,
  },
  classDetails: {
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
  joinButton: {
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
  joinButtonText: {
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

  // Join Modal Styles
  joinOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  joinModal: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
    elevation: 15,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
  },
  joinHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  joinIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  joinTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  joinSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  joinOptions: {
    marginBottom: 20,
  },
  joinOptionButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  primaryOption: {
    backgroundColor: "#3b82f6",
  },
  secondaryOption: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  primaryOptionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  secondaryOptionText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  cancelJoinButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelJoinText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
