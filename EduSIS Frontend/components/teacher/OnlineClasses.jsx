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
    setTitle(""); setDate(""); setTime(""); setDuration("");
    setShowForm(false);
  };

  const deleteClass = (id) => {
    Alert.alert("Delete Class", "Are you sure you want to delete this class?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setClasses((x) => x.filter((c) => c.id !== id)) },
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
      {/* Header Action */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowForm(true)}
      >
        <MaterialIcons name="video-call" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Schedule Class</Text>
      </TouchableOpacity>

      {/* List */}
      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 16 }}>
        {classes.map((cls) => (
          <View key={cls.id} style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <View style={styles.cardHeader}>
              <View style={styles.courseChip}>
                <MaterialIcons name="class" size={16} color={colors.primary} />
                <Text style={[styles.courseText, { color: colors.primary }]}>{cls.course}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteClass(cls.id)} style={styles.deleteBtn}>
                <MaterialIcons name="delete-outline" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.classTitle, { color: colors.text }]}>{cls.title}</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <MaterialIcons name="event" size={16} color={colors.textDim} />
                <Text style={[styles.detailText, { color: colors.textDim }]}>{cls.date}</Text>
              </View>
              <View style={styles.detail}>
                <MaterialIcons name="access-time" size={16} color={colors.textDim} />
                <Text style={[styles.detailText, { color: colors.textDim }]}>{cls.time} ({cls.duration})</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={() => onStartPress(cls)}
            >
              <MaterialIcons name="play-circle-outline" size={20} color="#fff" />
              <Text style={styles.startButtonText}>Start / Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Schedule Class Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Schedule New Class</Text>
              <TouchableOpacity onPress={() => setShowForm(false)}>
                <MaterialIcons name="close" size={24} color={colors.textDim} />
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

      {/* Join Options Modal */}
      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <View style={styles.joinOverlay}>
          <View style={styles.joinBox}>
            <Text style={styles.joinTitle}>Join meeting</Text>
            <TouchableOpacity style={styles.joinBtnPrimary} onPress={joinInApp}>
              <MaterialIcons name="app-settings-alt" size={18} color="#fff" />
              <Text style={styles.joinBtnPrimaryText}>Join in app</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinBtnSecondary} onPress={joinInBrowser}>
              <MaterialIcons name="open-in-browser" size={18} color="#1e90ff" />
              <Text style={styles.joinBtnSecondaryText}>Join in browser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPickerOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 12, marginBottom: 16,
    elevation: 2
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
  list: { flex: 1 },
  card: { borderRadius: 14, padding: 16, marginBottom: 14, elevation: 2 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  courseChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10,
    backgroundColor: "#e8f4ff",
  },
  courseText: { fontSize: 12, fontWeight: "800" },
  deleteBtn: { padding: 6 },
  classTitle: { fontSize: 16, fontWeight: "900", marginBottom: 12 },
  detailsRow: { flexDirection: "row", gap: 18, marginBottom: 16 },
  detail: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailText: { fontSize: 13 },
  startButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, paddingVertical: 11, borderRadius: 10,
  },
  startButtonText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 20 },
  modalContent: { borderRadius: 14, padding: 18 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  modalTitle: { fontSize: 18, fontWeight: "900" },
  input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 15 },
  submitButton: { padding: 14, borderRadius: 10, alignItems: "center", marginTop: 4 },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" },

  // join modal
  joinOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center", padding: 24 },
  joinBox: { width: "100%", maxWidth: 420, backgroundColor: "#fff", borderRadius: 16, padding: 18, elevation: 6 },
  joinTitle: { fontSize: 16, fontWeight: "900", color: "#1f2937", marginBottom: 12 },
  joinBtnPrimary: {
    flexDirection: "row", gap: 8, backgroundColor: "#1e90ff",
    paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 10
  },
  joinBtnPrimaryText: { color: "#fff", fontWeight: "800" },
  joinBtnSecondary: {
    flexDirection: "row", gap: 8, backgroundColor: "#eff6ff",
    paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center"
  },
  joinBtnSecondaryText: { color: "#1e90ff", fontWeight: "800" },
  cancelBtn: { paddingVertical: 10, alignItems: "center" },
  cancelText: { color: "#6b7280", fontWeight: "700" },
});
