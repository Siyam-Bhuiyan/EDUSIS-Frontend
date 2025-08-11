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

  