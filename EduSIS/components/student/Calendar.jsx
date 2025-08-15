import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import Animated, { FadeIn } from "react-native-reanimated";

// Import sub-components
import CalendarView from "../calendar/CalendarView";
import TasksView from "../calendar/TasksView";
import AddEventModal from "../calendar/AddEventModal";

export default function Calendar() {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("calendar");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    tag: "Assignment",
  });

  useEffect(() => {
    loadMockEvents();
  }, []);

  const loadMockEvents = () => {
    const today = new Date();
    const mockEvents = [
      {
        id: 1,
        title: "Math Assignment Due",
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(today.getDate() + 1).padStart(2, "0")}`,
        time: "11:59 PM",
        tag: "Assignment",
      },
      {
        id: 2,
        title: "Physics Lab",
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(today.getDate() + 3).padStart(2, "0")}`,
        time: "2:00 PM",
        tag: "Class",
      },
      {
        id: 3,
        title: "Chemistry Quiz",
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(today.getDate() + 5).padStart(2, "0")}`,
        time: "10:00 AM",
        tag: "Quiz",
      },
    ];
    setEvents(mockEvents);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (date) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !selectedDate) {
      Alert.alert("Error", "Please enter a title for the event");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      date: formatDate(selectedDate),
      time: formData.time || "All Day",
      tag: formData.tag,
    };

    setEvents([...events, newEvent]);
    setFormData({ title: "", time: "", tag: "Assignment" });
    setShowForm(false);
    setSelectedDate(null);
  };

  const deleteEvent = (eventId) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setEvents(events.filter((e) => e.id !== eventId)),
      },
    ]);
  };

  const getTodayEvents = () => {
    const today = new Date();
    const todayStr = formatDate(today.getDate());
    return events.filter((event) => event.date === todayStr);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={colors.isDark ? "light-content" : "dark-content"} />

      {/* Modern Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.headerIcon,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <MaterialIcons name="event" size={24} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Calendar
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textDim }]}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setView(view === "calendar" ? "list" : "calendar")}
            style={[
              styles.viewToggle,
              {
                backgroundColor:
                  view === "calendar" ? colors.primary + "15" : colors.bg,
              },
            ]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={view === "calendar" ? "view-list" : "calendar-today"}
              size={20}
              color={view === "calendar" ? colors.primary : colors.textDim}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textDim }]}>
            Loading events...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {view === "calendar" ? (
            <Animated.View entering={FadeIn}>
              <CalendarView
                currentDate={currentDate}
                events={events}
                onDateClick={handleDateClick}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                getTodayEvents={getTodayEvents}
              />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn}>
              <TasksView events={events} onDeleteEvent={deleteEvent} />
            </Animated.View>
          )}
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          setSelectedDate(new Date().getDate());
          setShowForm(true);
        }}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Add Event Modal */}
      <AddEventModal
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedDate(null);
        }}
        onSubmit={handleSubmit}
        selectedDate={selectedDate}
        currentDate={currentDate}
        formData={formData}
        setFormData={setFormData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  viewToggle: {
    padding: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
