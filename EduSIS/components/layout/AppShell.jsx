import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "./TopBar";
import UpcomingEventsPanel from "../student/UpcomingEventsPanel";

/**
 * AppShell
 * - Fixed TopBar visible on every page
 * - Right-side upcoming events panel
 * - Provides layout wrapper for all screens
 *
 * Usage:
 * <AppShell title="Student" subtitle="Dashboard">
 *   <StudentDashboard />
 * </AppShell>
 */
export default function AppShell({
  title = "EDUSIS",
  subtitle = "All-in-one University",
  children,
}) {
  const navigation = useNavigation();
  const [eventsOpen, setEventsOpen] = useState(false);

  //fetch user + events from store/api
  const avatarSource = require("../../assets/profile.jpg"); // replace with actual user avatar
  const upcoming = [
    {
      id: 1,
      title: "Networks Quiz",
      date: { day: "15", month: "AUG" },
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "DB Project Due",
      date: { day: "18", month: "AUG" },
      time: "11:59 PM",
    },
  ];

  return (
    <View style={styles.wrap}>
      <TopBar
        title={title}
        subtitle={subtitle}
        onPressMenu={() => navigation.openDrawer?.()}
        onPressEvents={() => setEventsOpen(true)}
        onPressProfile={() => navigation.navigate("Profile")}
        avatarSource={avatarSource}
      />

      <View style={styles.body}>{children}</View>

      <UpcomingEventsPanel
        visible={eventsOpen}
        onClose={() => setEventsOpen(false)}
        events={upcoming}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#f5f7fa" },
  body: { flex: 1 },
});
