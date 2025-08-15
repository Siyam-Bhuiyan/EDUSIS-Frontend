import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

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

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarView({
  currentDate,
  events,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  getTodayEvents,
}) {
  const { colors } = useTheme();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const formatDate = (date) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter((event) => event.date === dateStr);
  };

  const renderCalendar = () => {
    const days = [];
    const cellWidth = (width - 32) / 7;

    // Previous month dates
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

    // Current month dates
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = getEventsForDate(date);
      const isToday =
        new Date().toDateString() ===
        new Date(year, month, date).toDateString();

      days.push(
        <Animated.View
          entering={FadeInDown.delay((firstDay + date) * 50)}
          key={date}
        >
          <TouchableOpacity
            onPress={() => onDateClick(date)}
            style={[
              styles.calendarDay,
              { width: cellWidth },
              isToday && styles.today,
            ]}
          >
            <Text style={[styles.dateText, isToday && styles.todayText]}>
              {date}
            </Text>
            <View style={styles.eventsContainer}>
              {dayEvents.slice(0, 2).map((event) => {
                const t = tagStyle(event.tag);
                return (
                  <View
                    key={event.id}
                    style={[styles.eventDot, { backgroundColor: t.fg }]}
                  />
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
    <View style={styles.container}>
      {/* Calendar Navigation */}
      <View style={[styles.calendarNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={onPrevMonth}
          style={[styles.navButton, { backgroundColor: colors.bg }]}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.monthYearButton} activeOpacity={0.7}>
          <Text style={[styles.monthYear, { color: colors.text }]}>
            {months[month]} {year}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.textDim}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextMonth}
          style={[styles.navButton, { backgroundColor: colors.bg }]}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekdayContainer}>
        {weekdays.map((day, index) => (
          <View key={`weekday-${index}`} style={styles.weekdayHeader}>
            <Text
              style={[
                styles.weekdayText,
                {
                  color:
                    index === 0 || index === 6
                      ? colors.primary
                      : colors.textDim,
                },
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={[styles.calendarGrid, { backgroundColor: colors.card }]}>
        {renderCalendar()}
      </View>

      {/* Today's Events Quick View */}
      {getTodayEvents().length > 0 && (
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={[
            styles.todayEventsCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.todayEventsHeader}>
            <MaterialIcons name="today" size={20} color={colors.primary} />
            <Text style={[styles.todayEventsTitle, { color: colors.text }]}>
              Today's Events
            </Text>
          </View>
          {getTodayEvents()
            .slice(0, 3)
            .map((event, index) => (
              <View key={event.id} style={styles.todayEventItem}>
                <View
                  style={[
                    styles.eventIndicator,
                    { backgroundColor: tagStyle(event.tag).fg },
                  ]}
                />
                <Text
                  style={[styles.todayEventText, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {event.title}
                </Text>
                <Text
                  style={[styles.todayEventTime, { color: colors.textDim }]}
                >
                  {event.time}
                </Text>
              </View>
            ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
  },
  monthYearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekdayContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  weekdayHeader: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "600",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    minHeight: 300,
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
  todayEventsCard: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  todayEventsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  todayEventsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  todayEventItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  eventIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  todayEventText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  todayEventTime: {
    fontSize: 12,
    fontWeight: "500",
  },
});
