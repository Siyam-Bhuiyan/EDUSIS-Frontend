// components/student/Messages.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeProvider";

const CHANNELS = { TEACHER: "teacher", GROUP: "group" };
const { width } = Dimensions.get("window");

const formatDayLabel = (ts) => {
  const d = new Date(ts);
  const today = new Date();
  const yest = new Date();
  yest.setDate(today.getDate() - 1);

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(d, today)) return "Today";
  if (isSameDay(d, yest)) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export default function Messages() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [studentId] = useState("210041215");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [channel, setChannel] = useState(CHANNELS.GROUP);
  const [draft, setDraft] = useState("");

  // messageStore: { [course_id]: { teacher: Msg[], group: Msg[] } }
  const [messageStore, setMessageStore] = useState({});
  const listRef = useRef(null);

  // ---- Dummy data bootstrapping ----
  useEffect(() => {
    const dummyCourses = [
      { course_id: "CSE-4801", title: "Computer Networks", teacher_id: "T-1001" },
      { course_id: "CSE-4703", title: "Database Systems", teacher_id: "T-1002" },
      { course_id: "CSE-4203", title: "Software Engineering", teacher_id: "T-1003" },
    ];
    setCourses(dummyCourses);
    setSelectedCourseId(dummyCourses[0].course_id);

    const now = Date.now();
    const seed = {};
    dummyCourses.forEach((c, i) => {
      seed[c.course_id] = {
        [CHANNELS.TEACHER]: [
          {
            id: `${c.course_id}-t1`,
            sender_id: c.teacher_id,
            sender_role: "teacher",
            content: `Hi! DM me for ${c.title} queries.`,
            timestamp: now - (i + 1) * 1000 * 60 * 30,
          },
        ],
        [CHANNELS.GROUP]: [
          {
            id: `${c.course_id}-g1`,
            sender_id: "210041216",
            sender_role: "student",
            content: "Anyone has today’s slides?",
            timestamp: now - (i + 1) * 1000 * 60 * 60,
          },
          {
            id: `${c.course_id}-g2`,
            sender_id: studentId,
            sender_role: "student",
            content: "I’ll upload my notes soon.",
            timestamp: now - (i + 1) * 1000 * 60 * 50,
          },
        ],
      };
    });
    setMessageStore(seed);
  }, [studentId]);

  const selectedCourse = useMemo(
    () => courses.find((c) => c.course_id === selectedCourseId) || null,
    [courses, selectedCourseId]
  );

  const rawMessages = useMemo(() => {
    if (!selectedCourse) return [];
    return messageStore[selectedCourse.course_id]?.[channel] ?? [];
  }, [messageStore, selectedCourse, channel]);

  // Group messages by day for separators
  const sections = useMemo(() => {
    const byDay = new Map();
    for (const m of rawMessages.sort((a, b) => a.timestamp - b.timestamp)) {
      const label = formatDayLabel(m.timestamp);
      if (!byDay.has(label)) byDay.set(label, []);
      byDay.get(label).push(m);
    }
    const arr = [];
    for (const [label, items] of byDay.entries()) {
      arr.push({ type: "header", id: `h-${label}`, label });
      items.forEach((x) => arr.push({ type: "msg", ...x }));
    }
    return arr;
  }, [rawMessages]);

  const sendMessage = () => {
    const content = draft.trim();
    if (!content || !selectedCourse) return;

    const newMsg = {
      id: `${Date.now()}`,
      sender_id: studentId,
      sender_role: "student",
      content,
      timestamp: Date.now(),
    };

    setMessageStore((prev) => {
      const cid = selectedCourse.course_id;
      const byCourse = prev[cid] ?? { [CHANNELS.TEACHER]: [], [CHANNELS.GROUP]: [] };
      const updated = [...(byCourse[channel] ?? []), newMsg];
      return { ...prev, [cid]: { ...byCourse, [channel]: updated } };
    });
    setDraft("");

    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const isMine = (m) => m.sender_id === studentId;

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return (
        <View style={styles.daySeparator}>
          <Text style={styles.daySeparatorText}>{item.label}</Text>
        </View>
      );
    }

    const mine = isMine(item);
    return (
      <View style={[styles.row, mine ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }]}>
        <View style={[styles.bubble, mine ? styles.sent : styles.received, { maxWidth: Math.min(0.84 * width, 420) }]}>
          <View style={styles.metaRow}>
            <Text style={[styles.sender, mine ? styles.senderMine : styles.senderOther]}>
              {mine ? "You" : item.sender_role === "teacher" ? "Teacher" : `Student ${item.sender_id}`}
            </Text>
            <Text style={[styles.time, mine ? styles.timeMine : styles.timeOther]}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
          <Text style={[styles.content, !mine && styles.contentOther]}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.bg }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top + 92}
    >
      {/* Top controls */}
      <View style={[styles.topBar, { 
        backgroundColor: colors.cardBg,
        borderBottomColor: colors.border 
      }]}>
        <View style={styles.dropWrap}>
          <View style={[styles.pickerBox, { 
            borderColor: colors.border,
            backgroundColor: colors.inputBg 
          }]}>
            <Picker
              selectedValue={selectedCourseId}
              onValueChange={(v) => setSelectedCourseId(v)}
              dropdownIconColor={colors.primary}
              style={[styles.picker, { color: colors.text }]}
            >
              {courses.map((c) => (
                <Picker.Item key={c.course_id} label={`${c.course_id}`} value={c.course_id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.dropWrap}>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={channel}
              onValueChange={(v) => setChannel(v)}
              dropdownIconColor={colors.primary}
              style={styles.picker}
            >
              <Picker.Item label="Group Chat" value={CHANNELS.GROUP} />
              <Picker.Item label="Message Teacher" value={CHANNELS.TEACHER} />
            </Picker>
          </View>
        </View>
      </View>

      {/* Chat list */}
      <View style={styles.chatArea}>
        {selectedCourse ? (
          <FlatList
            ref={listRef}
            data={sections}
            keyExtractor={(it) => it.id || `${it.timestamp}`}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingVertical: 8, paddingBottom: 96 }}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="chat" size={64} color="#a3b1c2" />
            <Text style={styles.placeholderTitle}>Select a course to start</Text>
            <Text style={styles.placeholderSub}>Then choose Teacher or Group to chat.</Text>
          </View>
        )}
      </View>

      {/* Composer */}
      <View style={[styles.inputRow, { backgroundColor: colors.bg, paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBg,
            borderColor: colors.border,
            color: colors.text
          }]}
          value={draft}
          onChangeText={setDraft}
          placeholder={channel === CHANNELS.TEACHER ? "Message your teacher…" : "Message the group…"}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
          multiline
          maxLength={1000}
          placeholderTextColor={colors.textDim}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: colors.primary, opacity: !draft.trim() ? 0.5 : 1 }]}
          onPress={sendMessage}
          disabled={!draft.trim()}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          <MaterialIcons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // top row with two dropdowns
  topBar: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  dropWrap: { flex: 1 },
  dropLabel: { fontSize: 12, color: "#6b7c93", marginBottom: 1, fontWeight: "700" },
  pickerBox: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: { width: "100%", height: 53 },

  chatArea: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },

  daySeparator: {
    alignSelf: "center",
    backgroundColor: "#eaf2ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginVertical: 8,
  },
  daySeparatorText: { color: "#1e4db7", fontSize: 11, fontWeight: "800" },

  row: { flexDirection: "row", marginBottom: 8 },
  bubble: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sent: {
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  received: {
    borderWidth: StyleSheet.hairlineWidth,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  sender: { fontSize: 11, fontWeight: "800" },
  senderMine: { color: "#ffffffcc" },
  senderOther: { color: "#2c3e50" },
  time: { fontSize: 10 },
  timeMine: { color: "#ffffffaa" },
  timeOther: { color: "#6b7280" },
  content: { color: "#fff", fontSize: 14, lineHeight: 19 },
  contentOther: { color: "#1f2a37" },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    fontSize: 14.5,
    lineHeight: 20,
  },
  sendBtn: {
    marginLeft: 8,
    borderRadius: 20,
    padding: 10,
  },

  placeholder: { flex: 1, alignItems: "center", justifyContent: "center" },
  placeholderTitle: { fontSize: 16, fontWeight: "800", color: "#2c3e50", marginTop: 8 },
  placeholderSub: { fontSize: 13, color: "#7f8c8d", marginTop: 4, textAlign: "center" },
});
