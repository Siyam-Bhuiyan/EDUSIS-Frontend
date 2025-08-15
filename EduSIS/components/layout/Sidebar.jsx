import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Modern Sidebar Component
 * - Clean, streamlined design without box sections
 * - Integrated user profile at top
 * - Smooth navigation items with hover effects
 * - Settings and logout at bottom
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
  brandTitle = "Navigation",
}) {
  const { colors, isDark } = useTheme();
  const [activeItem, setActiveItem] = useState(null);

  const handlePress = (item) => {
    setActiveItem(item.id);
    setTimeout(() => setActiveItem(null), 150);

    if (item?.onPress) return item.onPress();
    if (item?.screen) return navigation.navigate(item.screen);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* App Branding Header */}
      <LinearGradient
        colors={isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.brandHeader}
      >
        <View style={styles.brandContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/logo.jpg")}
              style={styles.brandLogo}
            />
            <View style={styles.brandGlow} />
          </View>
          <View style={styles.brandTextContainer}>
            <Text style={styles.brandName}>EDUSIS</Text>
            <Text style={styles.brandTagline}>All IN ONE APP</Text>
          </View>
        </View>
        <View style={styles.brandDecoration}>
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </View>
      </LinearGradient>

      {/* Navigation Items */}
      <ScrollView
        style={styles.navigationContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuSection}>
          {quickActions.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                {
                  backgroundColor:
                    activeItem === item.id
                      ? colors.primary + "15"
                      : "transparent",
                },
              ]}
              onPress={() => handlePress(item)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.primary + "15" },
                ]}
              >
                <MaterialIcons
                  name={item.icon}
                  size={20}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>
                {item.title}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={18}
                color={colors.textDim}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View style={[styles.divider, { borderTopColor: colors.border }]} />

        {/* Footer Actions */}
        {footerActions.length > 0 && (
          <View style={styles.footerSection}>
            {footerActions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.footerItem,
                  {
                    backgroundColor:
                      activeItem === item.id
                        ? colors.textDim + "10"
                        : "transparent",
                  },
                ]}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={item.icon}
                  size={18}
                  color={colors.textDim}
                />
                <Text style={[styles.footerText, { color: colors.textDim }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { borderTopColor: colors.border }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <View style={styles.logoutIconContainer}>
            <MaterialIcons name="logout" size={18} color="#ef4444" />
          </View>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brandHeader: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  logoWrapper: {
    position: "relative",
    marginRight: 16,
  },
  brandLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandGlow: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    zIndex: -1,
  },
  brandTextContainer: {
    flex: 1,
  },
  brandName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandTagline: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  brandDecoration: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 120,
    height: 120,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  navigationContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuSection: {
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },

  divider: {
    marginTop: 12,
    marginHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  footerSection: {
    paddingHorizontal: 8,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
  logoutIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ef4444",
  },
});
