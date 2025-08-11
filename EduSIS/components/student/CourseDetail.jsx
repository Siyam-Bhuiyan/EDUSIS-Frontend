import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');

export default function TeacherCourseDetail({ route }) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('materials');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  
  const { courseTitle, section, courseID, students } = route.params;

  // Dummy data for demonstration
  const materials = [
    { id: 1, title: 'Lecture Notes Week 1', type: 'pdf', size: '2.3 MB', downloads: 45 },
    { id: 2, title: 'Course Syllabus', type: 'doc', size: '1.1 MB', downloads: 60 },
    { id: 3, title: 'Practice Problems', type: 'pdf', size: '3.5 MB', downloads: 38 },
  ];

  const assignments = [
    { id: 1, title: 'Assignment 1', dueDate: '2024-01-25', submissions: 28, totalStudents: 35 },
    { id: 2, title: 'Assignment 2', dueDate: '2024-02-01', submissions: 20, totalStudents: 35 },
    { id: 3, title: 'Mid-term Project', dueDate: '2024-02-15', submissions: 35, totalStudents: 35 },
  ];

  const announcements = [
    { id: 1, title: 'Class Cancelled Tomorrow', date: '2024-01-14', content: 'Due to maintenance...' },
    { id: 2, title: 'Extra Office Hours', date: '2024-01-13', content: 'Additional office hours...' },
  ];

  const handleAdd = (type) => {
    setModalType(type);
    setFormData({});
    setModalVisible(true);
  };

  const handleSubmit = () => {
    // Handle form submission based on modalType
    setModalVisible(false);
    setFormData({});
  };

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
          {item.size} • {item.downloads} downloads
        </Text>
      </View>
      <MaterialIcons name="more-vert" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  const renderAssignmentItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.assignmentCard, { backgroundColor: colors.cardBg }]}
      activeOpacity={0.7}
    >
      <View style={styles.assignmentHeader}>
        <Text style={[styles.assignmentTitle, { color: colors.text }]}>{item.title}</Text>
        <View style={styles.submissionInfo}>
          <MaterialIcons name="assignment-turned-in" size={16} color={colors.primary} />
          <Text style={[styles.submissionText, { color: colors.textLight }]}>
            {item.submissions}/{item.totalStudents}
          </Text>
        </View>
      </View>
      <View style={styles.assignmentFooter}>
        <Text style={[styles.dueDate, { color: colors.textLight }]}>
          Due: {item.dueDate}
        </Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Submissions</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderAnnouncementItem = ({ item }) => (
    <View style={[styles.announcementCard, { backgroundColor: colors.cardBg }]}>
      <View style={styles.announcementHeader}>
        <Text style={[styles.announcementTitle, { color: colors.text }]}>{item.title}</Text>
        <MaterialIcons name="edit" size={20} color={colors.primary} />
      </View>
      <Text style={[styles.announcementDate, { color: colors.textLight }]}>{item.date}</Text>
      <Text style={[styles.announcementContent, { color: colors.text }]} numberOfLines={2}>
        {item.content}
      </Text>
    </View>
  );

