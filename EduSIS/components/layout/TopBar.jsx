import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 *Topbar component for the EduSIS app
 * Props:
 * - title?: string
 * - subtitle?: string
 * - onPressMenu: () => void          // usually navigation.openDrawer()
 * - onPressEvents: () => void        // show right-side events panel
 * - onPressProfile: () => void       // navigate to Profile screen
 * - avatarSource?: ImageSourcePropType
 */
export default function TopBar({
  title = "EDUSIS",
  subtitle = "All-in-one University",
  onPressMenu,
  onPressEvents,
  onPressProfile,
  avatarSource = require("../../assets/logo.jpg"),
}) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#1e90ff", "#6fb1fc"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrap, { paddingTop: insets.top + 8 }]}
    >
      {/* Left: menu */}
      <TouchableOpacity
        onPress={onPressMenu}
        style={styles.iconBtn}
        accessibilityRole="button"
        accessibilityLabel="Open sidebar"
      >
        <MaterialIcons name="menu" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Middle: titles */}
      <View style={styles.center}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {!!subtitle && (
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right: events + profile */}
      <View style={styles.right}>
        <TouchableOpacity
          onPress={onPressEvents}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Open upcoming events"
        >
          <MaterialIcons name="event" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressProfile}
          style={[styles.iconBtn, styles.avatarWrap]}
          accessibilityRole="button"
          accessibilityLabel="Go to profile"
        >
          <Image source={avatarSource} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: { padding: 8 },
  center: { flex: 1, paddingHorizontal: 6 },
  title: { color: "#fff", fontSize: 18, fontWeight: "800", letterSpacing: 0.3 },
  subtitle: { color: "#ffffffcc", fontSize: 12, marginTop: 2 },
  right: { flexDirection: "row", alignItems: "center" },
  avatarWrap: {
    marginLeft: 2,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff" },
});
