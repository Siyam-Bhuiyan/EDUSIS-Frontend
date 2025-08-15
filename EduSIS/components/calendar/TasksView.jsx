import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import Animated, { FadeInDown } from "react-native-reanimated";

const tagStyle = (tag) => {
  switch (tag) {
    case "Quiz":
      return { bg: "#dbeafe", fg: "#3b82f6", icon: "quiz" };
    case "Deadline":
      return { bg: "#fed7aa", fg: "#f97316", icon: "schedule" };
    case "Exam":
      return { bg: "#dcfce7", fg: "#10b981", icon: "school" };
    case "Assignment":
      return { bg: "#fecaca", fg: "#ef4444", icon: "assignment" };
    case "Meeting":
      return { bg: "#e9d5ff", fg: "#8b5cf6", icon: "group" };
    case "Class":
      return { bg: "#fef3c7", fg: "#f59e0b", icon: "class" };
    default:
      return { bg: "#f3f4f6", fg: "#6b7280", icon: "event" };
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TasksView({ events, onDeleteEvent }) {
  const { colors } = useTheme();

  const renderEventCard = (event, index) => {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const monthName = months[eventDate.getMonth()].slice(0, 3).toUpperCase();
    const t = tagStyle(event.tag);

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)}
        key={event.id}
        style={[
          styles.eventCard,
          {
            backgroundColor: colors.card,
            borderLeftColor: t.fg,
            shadowColor: colors.text,
          },
        ]}
      >
        <View style={[styles.dateBox, { backgroundColor: t.bg }]}>
          <Text style={[styles.month, { color: t.fg }]}>{monthName}</Text>
          <Text style={[styles.day, { color: t.fg }]}>{day}</Text>
        </View>

        <View style={styles.eventInfo}>
          <Text
            numberOfLines={1}
            style={[styles.eventTitle, { color: colors.text }]}
          >
            {event.title}
          </Text>
          <View style={styles.eventMeta}>
            <MaterialIcons name={t.icon} size={14} color={colors.textDim} />
            <Text style={[styles.eventTime, { color: colors.textDim }]}>
              {event.time}
            </Text>
            <View style={[styles.eventTag, { backgroundColor: t.bg }]}>
              <Text style={[styles.eventTagText, { color: t.fg }]}>
                {event.tag}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onDeleteEvent(event.id)}
          style={[styles.deleteButton, { backgroundColor: colors.bg }]}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={[styles.listTitle, { color: colors.text }]}>
          All Events
        </Text>
        <View
          style={[
            styles.eventCount,
            { backgroundColor: colors.primary + "15" },
          ]}
        >
          <Text style={[styles.eventCountText, { color: colors.primary }]}>
            {events.length}
          </Text>
        </View>
      </View>

      {/* Events List */}
      <View style={styles.eventsList}>
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-busy" size={48} color={colors.textDim} />
            <Text style={[styles.emptyText, { color: colors.textDim }]}>
              No events scheduled
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textDim }]}>
              Tap the + button to add your first event
            </Text>
          </View>
        ) : (
          events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event, index) => renderEventCard(event, index))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventCount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventCountText: {
    fontSize: 12,
    fontWeight: "600",
  },
  eventsList: {
    paddingHorizontal: 16,
  },
  eventCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderLeftWidth: 4,
  },
  dateBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  month: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  day: {
    fontSize: 18,
    fontWeight: "900",
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  eventTime: {
    fontSize: 12.5,
  },
  eventTag: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  eventTagText: {
    fontSize: 11,
    fontWeight: "800",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});
