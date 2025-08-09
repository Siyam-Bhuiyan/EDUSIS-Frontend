// components/layout/TopBar.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeProvider"; // ✅ added

/**
 * Topbar component for the EduSIS app
 * (unchanged API)
 */
export default function TopBar({
  title = "EDUSIS",
  subtitle = "All-in-one University",
  onPressMenu,
  onPressEvents,
  onPressProfile,
  onToggleTheme, // ✅ optional
  avatarSource = require("../../assets/logo.jpg"),
}) {
  const insets = useSafeAreaInsets();
  const { mode } = useTheme(); // read current mode

  // switch gradient based on theme, keep your blue for light
  const gradient =
    mode === "dark" ? ["#0f172a", "#1e293b"] : ["#1e90ff", "#6fb1fc"];
  const iconColor = "#fff";
  const titleColor = "#fff";
  const subColor = "#ffffffcc";
  const avatarBorder = "#ffffff";

  return (
    <LinearGradient
      colors={gradient}
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
        <MaterialIcons name="menu" size={26} color={iconColor} />
      </TouchableOpacity>

      {/* Middle: titles */}
      <View style={styles.center}>
        <Text numberOfLines={1} style={[styles.title, { color: titleColor }]}>
          {title}
        </Text>
        {!!subtitle && (
          <Text
            numberOfLines={1}
            style={[styles.subtitle, { color: subColor }]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right: events + (optional) theme button + profile */}
      <View style={styles.right}>
        <TouchableOpacity
          onPress={onPressEvents}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Open upcoming events"
        >
          <MaterialIcons name="event" size={22} color={iconColor} />
        </TouchableOpacity>

        {onToggleTheme && (
          <TouchableOpacity
            onPress={onToggleTheme}
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="Toggle dark mode"
          >
            <MaterialIcons
              name={mode === "dark" ? "light-mode" : "dark-mode"}
              size={22}
              color={iconColor}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onPressProfile}
          style={[
            styles.iconBtn,
            styles.avatarWrap,
            { borderColor: avatarBorder },
          ]}
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
  title: { fontSize: 18, fontWeight: "800", letterSpacing: 0.3 },
  subtitle: { fontSize: 12, marginTop: 2 },
  right: { flexDirection: "row", alignItems: "center" },
  avatarWrap: {
    marginLeft: 2,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#fff" },
});
