import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function StudentEnrollment() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Demo data
  const enrollments = [
    {
      id: 'ENR001',
      student: {
        id: '210041215',
        name: 'John Doe',
        department: 'CSE',
        semester: '4th'
      },
      courses: [
        { id: 'CSE301', name: 'Computer Networks', status: 'Enrolled' },
        { id: 'CSE205', name: 'Database Systems', status: 'Pending' }
      ]
    },
    {
      id: 'ENR002',
      student: {
        id: '210041216',
        name: 'Jane Smith',
        department: 'EEE',
        semester: '4th'
      },
      courses: [
        { id: 'EEE201', name: 'Digital Electronics', status: 'Enrolled' },
        { id: 'CSE205', name: 'Database Systems', status: 'Enrolled' }
      ]
    }
  ];

  const EnrollmentCard = ({ enrollment, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={[styles.card, { backgroundColor: colors.cardBg }]}
    >
      <LinearGradient
        colors={['#f77062', '#fe5196']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardHeader}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={32} color="white" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{enrollment.student.name}</Text>
            <Text style={styles.studentId}>ID: {enrollment.student.id}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-vert" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons name="business" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{enrollment.student.department}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="schedule" size={20} color={colors.textDim} />
            <Text style={[styles.infoText, { color: colors.text }]}>{enrollment.student.semester} Semester</Text>
          </View>
        </View>

        <Text style={[styles.coursesTitle, { color: colors.textDim }]}>Enrolled Courses</Text>
        {enrollment.courses.map((course, idx) => (
          <View key={idx} style={styles.courseRow}>
            <View style={styles.courseInfo}>
              <Text style={[styles.courseId, { color: colors.textDim }]}>{course.id}</Text>
              <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
            </View>
            <View style={[
              styles.statusChip,
              { backgroundColor: course.status === 'Enrolled' ? '#2ecc71' : '#f1c40f' }
            ]}>
              <Text style={styles.statusText}>{course.status}</Text>
            </View>
          </View>
        ))}

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#2d3748' : '#e2e8f0' }]}
          >
            <MaterialIcons name="add" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Add Course</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: isDark ? '#2d3748' : '#e2e8f0' }]}
          >
            <MaterialIcons name="edit" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Edit</Text>
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
          placeholder="Search enrollments..."
          placeholderTextColor={colors.textDim}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#f77062', '#fe5196']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <MaterialIcons name="person-add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content}>
        {enrollments.map((enrollment, index) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} index={index} />
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
  studentId: {
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
  coursesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  courseInfo: {
    flex: 1,
  },
  courseId: {
    fontSize: 12,
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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