import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { initClient, loadCalendarEvents, signInAndLoadEvents } from "../../utils/googleCalendarApi";

const { width } = Dimensions.get("window");

const tagStyle = (tag) => {
  switch (tag) {
    case "Quiz":
      return { bg: "#eef7ff", fg: "#1e90ff" };
    case "Deadline":
      return { bg: "#fff4ec", fg: "#f97316" };
    case "Exam":
      return { bg: "#f2fff7", fg: "#10b981" };
    case "Assignment":
      return { bg: "#fef3f2", fg: "#ef4444" };
    case "Meeting":
      return { bg: "#f5f3ff", fg: "#8b5cf6" };
    default:
      return { bg: "#f3f4f6", fg: "#374151" };
  }
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("calendar");
  const [loading, setLoading] = useState(false);
  const [isGoogleCalendarLinked, setIsGoogleCalendarLinked] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    tag: "Assignment",
  });

  useEffect(() => {
    initializeGoogleCalendar();
  }, []);

  const initializeGoogleCalendar = async () => {
    try {
      await initClient();
      setIsGoogleCalendarLinked(true);
      fetchGoogleEvents();
    } catch (error) {
      console.error('Error initializing Google Calendar:', error);
    }
  };

  const fetchGoogleEvents = async () => {
    setLoading(true);
    try {
      const response = await loadCalendarEvents();
      const googleEvents = response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        date: event.start.dateTime ? new Date(event.start.dateTime).toISOString().split('T')[0] : event.start.date,
        time: event.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'All Day',
        tag: event.description?.includes('Quiz') ? 'Quiz' :
             event.description?.includes('Exam') ? 'Exam' :
             event.description?.includes('Assignment') ? 'Assignment' :
             event.description?.includes('Deadline') ? 'Deadline' : 'Meeting'
      }));
      setEvents(googleEvents);
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      Alert.alert('Error', 'Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCalendarSync = async () => {
    try {
      setLoading(true);
      await signInAndLoadEvents();
      fetchGoogleEvents();
    } catch (error) {
      console.error('Error syncing with Google Calendar:', error);
      Alert.alert('Error', 'Failed to sync with Google Calendar');
    } finally {
      setLoading(false);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (date) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter((event) => event.date === dateStr);
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

  const renderCalendar = () => {
    const days = [];
    const cellWidth = (width - 32) / 7;

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      days.push(
        <Animated.View
          entering={FadeInDown.delay(i * 50)}
          key={`prev-${date}`}
          style={[styles.calendarDay, { width: cellWidth }]}
        >
          <Text style={styles.prevMonthDate}>{date}</Text>
        </Animated.View>
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = getEventsForDate(date);
      const isToday = new Date().toDateString() === new Date(year, month, date).toDateString();

      days.push(
        <Animated.View
          entering={FadeInDown.delay((firstDay + date) * 50)}
          key={date}
        >
          <TouchableOpacity
            onPress={() => handleDateClick(date)}
            style={[styles.calendarDay, { width: cellWidth }, isToday && styles.today]}
          >
            <Text style={[styles.dateText, isToday && styles.todayText]}>{date}</Text>
            <View style={styles.eventsContainer}>
              {dayEvents.slice(0, 2).map((event) => {
                const t = tagStyle(event.tag);
                return (
                  <View key={event.id} style={[styles.eventDot, { backgroundColor: t.fg }]} />
                );
              })}
              {dayEvents.length > 2 && (
                <Text style={styles.moreEvents}>+{dayEvents.length - 2}</Text>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return days;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={[colors.cardBg, colors.bg]}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <MaterialIcons name="event" size={24} color="#1e90ff" />
          <Text style={[styles.title, { color: colors.text }]}>Calendar</Text>
        </View>
        <View style={styles.headerActions}>
          {!isGoogleCalendarLinked && (
            <TouchableOpacity
              onPress={handleGoogleCalendarSync}
              style={styles.syncButton}
            >
              <MaterialIcons name="sync" size={20} color="#1e90ff" />
              <Text style={styles.syncButtonText}>Sync with Google</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setView(view === "calendar" ? "list" : "calendar")}
            style={styles.viewToggle}
          >
            <MaterialIcons
              name={view === "calendar" ? "view-list" : "view-module"}
              size={20}
              color="#666"
            />
            <Text style={styles.viewToggleText}>
              {view === "calendar" ? "List" : "Calendar"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {view === "calendar" ? (
            <Animated.View entering={FadeInUp}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
                  <MaterialIcons name="chevron-left" size={24} color="#666" />
                </TouchableOpacity>
                <Text style={styles.monthYear}>{months[month]} {year}</Text>
                <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                  <MaterialIcons name="chevron-right" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.weekdayContainer}>
                {weekdays.map((day) => (
                  <View key={day} style={[styles.weekdayHeader, { width: (width - 32) / 7 }]}>
                    <Text style={styles.weekdayText}>{day}</Text>
                  </View>
                ))}
              </View>

              <View style={[styles.calendarGrid, { backgroundColor: colors.cardBg }]}>
                {renderCalendar()}
              </View>
            </Animated.View>
          ) : (
            <View style={styles.listContainer}>
              <Text style={styles.listTitle}>All Events</Text>
              {events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event, index) => {
                  const [mon, day] = event.date.split("-")[1] === "08"
                    ? ["AUG", event.date.split("-")[2]]
                    : [
                        months[parseInt(event.date.split("-")[1]) - 1]
                          .slice(0, 3)
                          .toUpperCase(),
                        event.date.split("-")[2],
                      ];

                  const t = tagStyle(event.tag);

                  return (
                    <Animated.View
                      entering={FadeInDown.delay(index * 100)}
                      key={event.id}
                    >
                      <TouchableOpacity
                        style={[styles.eventCard, { backgroundColor: colors.cardBg }]}
                      >
                        <View style={styles.dateBox}>
                          <Text style={styles.month}>{mon}</Text>
                          <Text style={styles.day}>{day}</Text>
                        </View>

                        <View style={styles.eventInfo}>
                          <Text numberOfLines={1} style={[styles.eventTitle, { color: colors.text }]}>
                            {event.title}
                          </Text>
                          <View style={styles.eventMeta}>
                            <MaterialIcons name="schedule" size={14} color="#6b7280" />
                            <Text style={styles.eventTime}>{event.time}</Text>
                            <Text style={[styles.eventTag, { backgroundColor: t.bg, color: t.fg }]}>
                              {event.tag}
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() => deleteEvent(event.id)}
                          style={styles.deleteButton}
                        >
                          <MaterialIcons name="close" size={20} color="#ef4444" />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
            </View>
          )}
        </ScrollView>
      )}

      <Modal
        visible={showForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowForm(false);
          setSelectedDate(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            entering={FadeInUp}
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Add Event - {selectedDate && `${months[month]} ${selectedDate}, ${year}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowForm(false);
                  setSelectedDate(null);
                }}
                style={styles.modalClose}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Event Title</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.bg, color: colors.text }]}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter event title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Time (Optional)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.bg, color: colors.text }]}
                value={formData.time}
                onChangeText={(text) => setFormData({ ...formData, time: text })}
                placeholder="e.g., 10:00 AM or All Day"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Category</Text>
              <View style={styles.tagPicker}>
                {["Assignment", "Quiz", "Exam", "Deadline", "Meeting"].map((tag) => {
                  const t = tagStyle(tag);
                  const isSelected = formData.tag === tag;
                  return (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => setFormData({ ...formData, tag })}
                      style={[styles.tagOption, { backgroundColor: isSelected ? t.fg : t.bg }]}
                    >
                      <Text style={[styles.tagOptionText, { color: isSelected ? "#fff" : t.fg }]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => {
                  setShowForm(false);
                  setSelectedDate(null);
                }}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <MaterialIcons name="add" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eef7ff",
    borderRadius: 8,
  },
  syncButtonText: {
    fontSize: 14,
    color: "#1e90ff",
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  viewToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  viewToggleText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2a37",
  },
  weekdayContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  weekdayHeader: {
    paddingVertical: 12,
    alignItems: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  calendarDay: {
    height: 60,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    borderRightWidth: 1,
    borderRightColor: "#f3f4f6",
  },
  today: {
    backgroundColor: "#eff6ff",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 2,
  },
  todayText: {
    color: "#1e90ff",
  },
  prevMonthDate: {
    fontSize: 14,
    color: "#d1d5db",
    textAlign: "center",
    marginTop: 4,
  },
  eventsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreEvents: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2a37",
    marginBottom: 16,
  },
  eventCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  month: {
    color: "#ffffffcc",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  day: {
    color: "#fff",
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
    color: "#6b7280",
  },
  eventTag: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalClose: {
    padding: 4,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  tagPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  tagOptionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
