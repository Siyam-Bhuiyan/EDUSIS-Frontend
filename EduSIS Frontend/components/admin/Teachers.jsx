import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function Teachers() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Demo data
  const teachers = [
    { 
      id: 'FAC001', 
      name: 'Dr. Sarah Johnson', 
      department: 'CSE',
      designation: 'Professor',
      courses: ['Computer Networks', 'Data Structures'],
      email: 'sarah.j@edusis.com'
    },
    { 
      id: 'FAC002', 
      name: 'Prof. Michael Chen', 
      department: 'EEE',
      designation: 'Associate Professor',
      courses: ['Digital Electronics', 'Circuit Theory'],
      email: 'michael.c@edusis.com'
    },
    { 
      id: 'FAC003', 
      name: 'Dr. Emily Brown', 
      department: 'CSE',
      designation: 'Assistant Professor',
      courses: ['Database Systems', 'Web Development'],
      email: 'emily.b@edusis.com'
    },
  ];

  const TeacherCard = ({ teacher, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={[styles.card, { backgroundColor: colors.cardBg }]}
    >
      <LinearGradient
        colors={['#43e97b', '#38f9d7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardHeader}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="school" size={32} color="white" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{teacher.name}</Text>
            <Text style={styles.designation}>{teacher.designation}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-vert" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons name="badge" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{teacher.id}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="business" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{teacher.department}</Text>
          </View>
        </View>

        <View style={styles.coursesContainer}>
          <Text style={[styles.coursesTitle, { color: colors.textDim }]}>Courses</Text>
          <View style={styles.coursesList}>
            {teacher.courses.map((course, idx) => (
              <View 
                key={idx} 
                style={[styles.courseChip, { backgroundColor: isDark ? '#2d3748' : '#e2e8f0' }]}
              >
                <Text style={[styles.courseText, { color: colors.text }]}>{course}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.emailContainer}>
          <MaterialIcons name="email" size={20} color={colors.textDim} />
          <Text style={[styles.emailText, { color: colors.text }]}>{teacher.email}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>

      <Animated.View 
        entering={FadeInDown.delay(100)}
        style={[styles.searchContainer, { backgroundColor: colors.cardBg }]}
      >
        <MaterialIcons name="search" size={24} color={colors.textDim} />
        <TextInput
          placeholder="Search teachers..."
          placeholderTextColor={colors.textDim}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#43e97b', '#38f9d7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <MaterialIcons name="person-add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content}>
        {teachers.map((teacher, index) => (
          <TeacherCard key={teacher.id} teacher={teacher} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 12,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  designation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  moreButton: {
    padding: 8,
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
  },
  coursesContainer: {
    marginBottom: 16,
  },
  coursesTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  coursesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  courseChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  courseText: {
    fontSize: 14,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    marginLeft: 8,
    fontSize: 14,
  },
});