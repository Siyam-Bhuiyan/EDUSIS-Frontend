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
  SafeAreaView,
  StatusBar,
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
      {
        course_id: "CSE-4801",
        title: "Computer Networks",
        teacher_id: "T-1001",
      },
      {
        course_id: "CSE-4703",
        title: "Database Systems",
        teacher_id: "T-1002",
      },
      {
        course_id: "CSE-4203",
        title: "Software Engineering",
        teacher_id: "T-1003",
      },
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
      const byCourse = prev[cid] ?? {
        [CHANNELS.TEACHER]: [],
        [CHANNELS.GROUP]: [],
      };
      const updated = [...(byCourse[channel] ?? []), newMsg];
      return { ...prev, [cid]: { ...byCourse, [channel]: updated } };
    });
    setDraft("");

    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true })
    );
  };

  const isMine = (m) => m.sender_id === studentId;

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return (
        <View
          style={[
            styles.daySeparator,
            { backgroundColor: colors.primary + "15" },
          ]}
        >
          <Text style={[styles.daySeparatorText, { color: colors.primary }]}>
            {item.label}
          </Text>
        </View>
      );
    }

    const mine = isMine(item);
    return (
      <View
        style={[
          styles.messageContainer,
          mine ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            mine ? styles.sentBubble : styles.receivedBubble,
            {
              backgroundColor: mine ? colors.primary : colors.card,
              maxWidth: Math.min(0.8 * width, 300),
              shadowColor: colors.text,
            },
          ]}
        >
          <View style={styles.messageHeader}>
            <Text
              style={[
                styles.senderName,
                { color: mine ? "rgba(255,255,255,0.8)" : colors.textDim },
              ]}
            >
              {mine
                ? "You"
                : item.sender_role === "teacher"
                ? "Teacher"
                : `Student ${item.sender_id.slice(-3)}`}
            </Text>
            <Text
              style={[
                styles.messageTime,
                { color: mine ? "rgba(255,255,255,0.7)" : colors.textDim },
              ]}
            >
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <Text
            style={[
              styles.messageContent,
              { color: mine ? "#fff" : colors.text },
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={colors.isDark ? "light-content" : "dark-content"} />

      {/* Modern Header with Course Selection */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="chat" size={24} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Messages
            </Text>
          </View>

          <View style={styles.headerControls}>
            {/* Course Selector */}
            <View
              style={[
                styles.selectorContainer,
                { backgroundColor: colors.bg, borderColor: colors.border },
              ]}
            >
              <MaterialIcons name="school" size={20} color={colors.primary} />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCourseId}
                  onValueChange={(v) => setSelectedCourseId(v)}
                  style={[styles.picker, { color: colors.text }]}
                  dropdownIconColor={colors.primary}
                >
                  {courses.map((c) => (
                    <Picker.Item
                      key={c.course_id}
                      label={c.course_id}
                      value={c.course_id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Channel Selector */}
            <View
              style={[
                styles.selectorContainer,
                { backgroundColor: colors.bg, borderColor: colors.border },
              ]}
            >
              <MaterialIcons
                name={channel === CHANNELS.TEACHER ? "person" : "group"}
                size={18}
                color={colors.primary}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={channel}
                  onValueChange={(v) => setChannel(v)}
                  style={[styles.picker, { color: colors.text }]}
                  dropdownIconColor={colors.primary}
                >
                  <Picker.Item label="Group Chat" value={CHANNELS.GROUP} />
                  <Picker.Item label="Teacher" value={CHANNELS.TEACHER} />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Chat Content */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {selectedCourse ? (
          <>
            {/* Messages List */}
            <View
              style={[styles.messagesContainer, { backgroundColor: colors.bg }]}
            >
              <FlatList
                ref={listRef}
                data={sections}
                keyExtractor={(it) => it.id || `${it.timestamp}`}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.messagesContent}
                onContentSizeChange={() =>
                  listRef.current?.scrollToEnd({ animated: true })
                }
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>

            {/* Input Area */}
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.card,
                  borderTopColor: colors.border,
                  paddingBottom: Math.max(insets.bottom, 12),
                },
              ]}
            >
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  style={styles.attachButton}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name="attach-file"
                    size={20}
                    color={colors.textDim}
                  />
                </TouchableOpacity>

                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={draft}
                  onChangeText={setDraft}
                  placeholder={
                    channel === CHANNELS.TEACHER
                      ? "Message your teacher..."
                      : "Message the group..."
                  }
                  placeholderTextColor={colors.textDim}
                  multiline
                  maxLength={1000}
                  returnKeyType="send"
                  onSubmitEditing={sendMessage}
                />

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor: draft.trim()
                        ? colors.primary
                        : colors.textDim + "30",
                    },
                  ]}
                  onPress={sendMessage}
                  disabled={!draft.trim()}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="send"
                    size={18}
                    color={draft.trim() ? "#fff" : colors.textDim}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyStateIcon,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialIcons name="chat" size={48} color={colors.primary} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              Welcome to Messages
            </Text>
            <Text style={[styles.emptyStateText, { color: colors.textDim }]}>
              Select a course above to start chatting with your teacher or
              classmates
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Modern Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 12,
  },
  headerControls: {
    flexDirection: "row",
    gap: 8,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 120,
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  picker: {
    height: 30,
    fontSize: 14,
  },

  // Chat Container
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 80,
  },

  // Day Separator
  daySeparator: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginVertical: 12,
  },
  daySeparatorText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Messages
  messageContainer: {
    marginBottom: 12,
    flexDirection: "row",
  },
  sentMessage: {
    justifyContent: "flex-end",
  },
  receivedMessage: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sentBubble: {
    borderBottomRightRadius: 6,
  },
  receivedBubble: {
    borderBottomLeftRadius: 6,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
  },
  messageTime: {
    fontSize: 11,
    fontWeight: "500",
  },
  messageContent: {
    fontSize: 15,
    lineHeight: 20,
  },

  // Input Area
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
    textAlignVertical: "center",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
