import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function Courses() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Demo data
  const courses = [
    {
      id: 'CSE301',
      title: 'Computer Networks',
      department: 'CSE',
      credit: 3,
      semester: '4th',
      teacher: 'Dr. Sarah Johnson',
      students: 45,
    },
    {
      id: 'CSE205',
      title: 'Database Systems',
      department: 'CSE',
      credit: 3,
      semester: '3rd',
      teacher: 'Prof. Michael Chen',
      students: 40,
    },
    {
      id: 'EEE201',
      title: 'Digital Electronics',
      department: 'EEE',
      credit: 4,
      semester: '3rd',
      teacher: 'Dr. Emily Brown',
      students: 38,
    },
  ];

  const CourseCard = ({ course, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={[styles.card, { backgroundColor: colors.cardBg }]}
    >
      <LinearGradient
        colors={['#fa709a', '#fee140']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBanner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.courseId}>{course.id}</Text>
          <View style={styles.creditContainer}>
            <Text style={styles.creditText}>{course.credit} Credits</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-vert" size={24} color={colors.textDim} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <MaterialIcons name="business" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{course.department}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="schedule" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{course.semester} Semester</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialIcons name="school" size={20} color={colors.textDim} />
            <Text style={[styles.statText, { color: colors.text }]}>{course.teacher}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="groups" size={20} color={colors.textDim} />
            <Text style={[styles.statText, { color: colors.text }]}>{course.students} Students</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#2d3748' : '#e2e8f0' }]}
          >
            <MaterialIcons name="edit" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#2d3748' : '#e2e8f0' }]}
          >
            <MaterialIcons name="people" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Enrollment</Text>
          </TouchableOpacity>
        </View>
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
          placeholder="Search courses..."
          placeholderTextColor={colors.textDim}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content}>
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
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
  cardBanner: {
    padding: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseId: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  creditContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  creditText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  moreButton: {
    padding: 8,
  },
  infoGrid: {
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
  statsContainer: {
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});