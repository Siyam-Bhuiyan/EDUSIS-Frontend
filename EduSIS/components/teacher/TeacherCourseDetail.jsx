import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');

export default function CourseDetail({ route }) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('materials');
  const { courseTitle, teacherName, teacherAvatarUri, courseID } = route.params;

  // Dummy data for demonstration
  const materials = [
    { id: 1, title: 'Lecture Notes Week 1', type: 'pdf', size: '2.3 MB', date: '2024-01-15' },
    { id: 2, title: 'Course Syllabus', type: 'doc', size: '1.1 MB', date: '2024-01-10' },
    { id: 3, title: 'Practice Problems', type: 'pdf', size: '3.5 MB', date: '2024-01-18' },
  ];

  const assignments = [
    { id: 1, title: 'Assignment 1', dueDate: '2024-01-25', status: 'pending' },
    { id: 2, title: 'Assignment 2', dueDate: '2024-02-01', status: 'submitted' },
    { id: 3, title: 'Mid-term Project', dueDate: '2024-02-15', status: 'graded', grade: 'A' },
  ];

  const announcements = [
    { id: 1, title: 'Class Cancelled Tomorrow', date: '2024-01-14', content: 'Due to maintenance...' },
    { id: 2, title: 'Extra Office Hours', date: '2024-01-13', content: 'Additional office hours...' },
  ];

  const renderMaterialItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.materialCard, { backgroundColor: colors.cardBg }]}
      activeOpacity={0.7}
    >
      <MaterialIcons 
        name={item.type === 'pdf' ? 'picture-as-pdf' : 'description'} 
        size={24} 
        color={colors.primary} 
      />
      <View style={styles.materialInfo}>
        <Text style={[styles.materialTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.materialMeta, { color: colors.textLight }]}>
          {item.size} • {item.date}
        </Text>
      </View>
      <MaterialIcons name="download" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  const renderAssignmentItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.assignmentCard, { backgroundColor: colors.cardBg }]}
      activeOpacity={0.7}
    >
      <View style={styles.assignmentHeader}>
        <Text style={[styles.assignmentTitle, { color: colors.text }]}>{item.title}</Text>
        <View style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.assignmentFooter}>
        <Text style={[styles.dueDate, { color: colors.textLight }]}>
          Due: {item.dueDate}
        </Text>
        {item.grade && (
          <Text style={[styles.grade, { color: colors.primary }]}>Grade: {item.grade}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderAnnouncementItem = ({ item }) => (
    <View style={[styles.announcementCard, { backgroundColor: colors.cardBg }]}>
      <Text style={[styles.announcementTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.announcementDate, { color: colors.textLight }]}>{item.date}</Text>
      <Text style={[styles.announcementContent, { color: colors.text }]} numberOfLines={2}>
        {item.content}
      </Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'rgba(255, 171, 0, 0.2)';
      case 'submitted': return 'rgba(0, 184, 148, 0.2)';
      case 'graded': return 'rgba(116, 185, 255, 0.2)';
      default: return 'rgba(128, 128, 128, 0.2)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={[colors.primary, colors.bg]}
        style={styles.header}
      >
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseId}>{courseID}</Text>
            <MaterialIcons name="bookmark-border" size={24} color="#fff" />
          </View>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <View style={styles.teacherInfo}>
            {teacherAvatarUri && (
              <Image
                source={{ uri: teacherAvatarUri }}
                style={styles.teacherAvatar}
              />
            )}
            <Text style={styles.teacherName}>{teacherName}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabs}>
        {['materials', 'assignments', 'announcements'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  courseInfo: {
    marginTop: 10,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseId: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  courseTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  teacherAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  teacherName: {
    color: '#fff',
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e90ff',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#1e90ff',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  materialInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  materialMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  assignmentCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1e90ff',
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dueDate: {
    fontSize: 12,
  },
  grade: {
    fontSize: 12,
    fontWeight: '600',
  },
  announcementCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  announcementDate: {
    fontSize: 12,
    marginTop: 4,
  },
  announcementContent: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});