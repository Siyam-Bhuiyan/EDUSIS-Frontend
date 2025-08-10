import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function AdminProfile() {
  const { colors, isDark } = useTheme();

  // Demo admin data
  const adminData = {
    id: 'ADM001',
    name: 'John Anderson',
    role: 'System Administrator',
    email: 'john.anderson@edusis.edu',
    phone: '+1 (555) 123-4567',
    department: 'IT Administration',
    joinDate: '2020-01-15',
    lastActive: '2023-11-28 09:30 AM',
  };


  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.View entering={FadeInDown} style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={80} color="white" />
          </View>
          <Text style={styles.name}>{adminData.name}</Text>
          <Text style={styles.role}>{adminData.role}</Text>
          <View style={styles.badgeContainer}>
            <MaterialIcons name="verified" size={16} color="white" />
            <Text style={styles.badgeText}>Verified Admin</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200)} style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.text }]}>{adminData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="phone" size={20} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.text }]}>{adminData.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="business" size={20} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.text }]}>{adminData.department}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="event" size={20} color={colors.textDim} />
              <Text style={[styles.infoText, { color: colors.text }]}>Joined {adminData.joinDate}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  role: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
  },
});