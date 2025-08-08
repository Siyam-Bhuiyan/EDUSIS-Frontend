import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";

/**
 * Sidebar (Drawer content)
 * - Shows a branded header
 * - Lists "Quick Actions" (tap to navigate)
 * - Optional footer actions (e.g., Settings, Logout)
 *
 * Props:
 * - navigation: from Drawer
 * - user: { name: string, sub: string, avatar?: any }
 * - quickActions: Array<{ id, title, icon, screen?: string, onPress?: fn }>
 * - footerActions?: same shape as quickActions
 * - brandTitle?: string
 */
export default function Sidebar({
  navigation,
  user = { name: "User", sub: "Welcome to EDUSIS" },
  quickActions = [],
  footerActions = [],
  brandTitle = "Quick Actions",
}) {
  const handlePress = (item) => {
    if (item?.onPress) return item.onPress();
    if (item?.screen) return navigation.navigate(item.screen);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <LinearGradient
        colors={["#1e90ff", "#6fb1fc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.brandRow}>
          <Image source={require("../assets/logo.jpg")} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.appName}>EDUSIS</Text>
            <Text style={styles.appTag}>All-in-one University</Text>
          </View>
        </View>

      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{brandTitle}</Text>
        <View style={styles.actionsWrap}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.actionItem}
              onPress={() => handlePress(a)}
              activeOpacity={0.85}
            >
              <MaterialIcons name={a.icon} size={22} color="#1e90ff" />
              <Text style={styles.actionText}>{a.title}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#a3b1c2" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <ScrollView>
          {footerActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.footerItem}
              onPress={() => handlePress(a)}
              activeOpacity={0.85}
            >
              <MaterialIcons name={a.icon} size={20} color="#6b7c93" />
              <Text style={styles.footerText}>{a.title}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.footerItem, { marginTop: 8 }]}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialIcons name="logout" size={20} color="#e74c3c" />
            <Text style={[styles.footerText, { color: "#e74c3c" }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  appName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  appTag: { color: "#ffffffcc", fontSize: 12, marginTop: 2 },

  userRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  userName: { color: "#fff", fontSize: 16, fontWeight: "700" },
  userSub: { color: "#ffffffcc", fontSize: 12, marginTop: 2 },

  section: { paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  actionsWrap: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  actionItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ecf0f1",
  },
  actionText: { flex: 1, fontSize: 15, color: "#2c3e50", fontWeight: "600" },

  footer: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 16 },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  footerText: { fontSize: 14, color: "#6b7c93", fontWeight: "600" },
});
