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
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import JitsiMeetingScreen from "./JitsiMeetingScreen";

export default function OnlineClasses() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  // Demo data
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Computer Networks – Transport Layer",
      course: "CSE-301",
      date: "2025-02-15",
      time: "10:00 AM",
      duration: "1.5 hours",
      status: "upcoming",
      room: "edusis-CSE-301-transport-170001",
    },
    {
      id: 2,
      title: "Database Normalization (3NF, BCNF)",
      course: "CSE-205",
      date: "2025-02-14",
      time: "2:30 PM",
      duration: "2 hours",
      status: "completed",
      room: "edusis-CSE-205-normalization-170002",
    },
  ]);

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !time.trim() || !duration.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const room = `edusis-${"CSE-301"}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 30)}-${Date.now()}`;

    const newClass = {
      id: Date.now(),
      title: title.trim(),
      course: "CSE-301", // demo value
      date: date.trim(),
      time: time.trim(),
      duration: duration.trim(),
      status: "upcoming",
      room,
    };

    setClasses([newClass, ...classes]);
    setTitle("");
    setDate("");
    setTime("");
    setDuration("");
    setShowForm(false);

    // 👉 Here you can POST {room} to your backend and notify students with the Jitsi link:
    // `https://meet.jit.si/${encodeURIComponent(room)}`
  };

  const deleteClass = (id) => {
    Alert.alert("Delete Class", "Are you sure you want to delete this class?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setClasses(classes.filter((c) => c.id !== id)),
      },
    ]);
  };

  const openMeeting = (cls) => {
    navigation.navigate("JitsiMeetingScreen", {
      room: cls.room,
      subject: `${cls.course} — ${cls.title}`,
      user: { name: "Dr. Smith" }, // replace with real user from your auth state
      // serverURL: "https://meet.jit.si", // or your self‑hosted jitsi
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header card */}
      <View style={[styles.hero, { backgroundColor: colors.cardBg }]}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=60&w=1200" }}
          style={styles.heroImg}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={[styles.heroTitle]}>Online Classes</Text>
          <Text style={styles.heroSub}>Schedule, start and share Jitsi links with one tap.</Text>

          <TouchableOpacity
            style={[styles.addButton]}
            onPress={() => setShowForm(true)}
            activeOpacity={0.9}
          >
            <MaterialIcons name="video-call" size={22} color="#fff" />
            <Text style={styles.addButtonText}>Schedule Class</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Classes List */}
      <ScrollView style={styles.list} contentContainerStyle={{ padding: 14 }}>
        {classes.map((cls) => (
          <View key={cls.id} style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <View style={styles.cardHeader}>
              <View style={styles.left}>
                <View style={styles.courseChip}>
                  <MaterialIcons name="class" size={16} color="#1e90ff" />
                  <Text style={styles.courseText}>{cls.course}</Text>
                </View>
                <Text style={[styles.classTitle, { color: colors.text }]} numberOfLines={2}>
                  {cls.title}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteClass(cls.id)} style={styles.iconBtn}>
                <MaterialIcons name="delete-outline" size={22} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <MaterialIcons name="event" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{cls.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{cls.time} ({cls.duration})</Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.primaryBtn]}
                onPress={() => openMeeting(cls)}
              >
                <MaterialIcons name="videocam" size={18} color="#fff" />
                <Text style={styles.primaryBtnText}>
                  {cls.status === "upcoming" ? "Start Class" : "View Recording"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => {
                  const link = `https://meet.jit.si/${encodeURIComponent(cls.room)}`;
                  Alert.alert("Share Link", link);
                  // You can copy to clipboard or POST to backend to notify students
                }}
              >
                <MaterialIcons name="share" size={18} color="#1e90ff" />
                <Text style={styles.secondaryBtnText}>Share Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Schedule Class Modal */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Schedule New Class</Text>
              <TouchableOpacity onPress={() => setShowForm(false)} style={styles.iconBtn}>
                <MaterialIcons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input]}
              placeholder="Class Title"
              placeholderTextColor="#9aa4b2"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              placeholderTextColor="#9aa4b2"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g. 10:00 AM)"
              placeholderTextColor="#9aa4b2"
              value={time}
              onChangeText={setTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration (e.g. 1.5 hours)"
              placeholderTextColor="#9aa4b2"
              value={duration}
              onChangeText={setDuration}
            />

            <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create & Get Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { height: 180, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, overflow: "hidden" },
  heroImg: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  heroContent: { position: "absolute", left: 16, right: 16, bottom: 16 },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "900" },
  heroSub: { color: "#ffffffd0", marginTop: 4, fontSize: 13, fontWeight: "600" },
  addButton: { marginTop: 10, alignSelf: "flex-start", backgroundColor: "#1e90ff", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 6 },
  addButtonText: { color: "#fff", fontWeight: "800" },

  list: { flex: 1 },
  card: { borderRadius: 14, padding: 14, marginBottom: 12, elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  left: { flex: 1, paddingRight: 8 },
  courseChip: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#eaf2ff", borderColor: "#dbeafe", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 8 },
  courseText: { color: "#1e90ff", fontWeight: "800", fontSize: 12 },
  classTitle: { fontSize: 16, fontWeight: "900" },
  iconBtn: { padding: 6 },

  metaRow: { flexDirection: "row", gap: 18, marginTop: 10 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { color: "#6b7280", fontWeight: "600" },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  primaryBtn: { flex: 1, backgroundColor: "#1e90ff", borderRadius: 10, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  primaryBtnText: { color: "#fff", fontWeight: "800" },
  secondaryBtn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#eef7ff", flexDirection: "row", alignItems: "center", gap: 6 },
  secondaryBtnText: { color: "#1e90ff", fontWeight: "800" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 20 },
  modalContent: { borderRadius: 14, padding: 18 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: "900" },
  input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: "#fff", fontSize: 16 },
  submitButton: { backgroundColor: "#1e90ff", padding: 14, borderRadius: 10, alignItems: "center" },
  submitButtonText: { color: "#fff", fontWeight: "800" },
});
