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