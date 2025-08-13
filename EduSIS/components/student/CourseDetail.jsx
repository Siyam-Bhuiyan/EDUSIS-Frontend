import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  StatusBar,
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

  // Sample data
  const materials = [
    { id: 1, title: 'Advanced Algorithm Notes', type: 'pdf', size: '2.3 MB', downloads: 45 },
    { id: 2, title: 'Course Syllabus 2024', type: 'doc', size: '1.1 MB', downloads: 60 },
    { id: 3, title: 'Problem Set Collection', type: 'pdf', size: '3.5 MB', downloads: 38 },
  ];

  const assignments = [
    { id: 1, title: 'Data Structures Quiz', dueDate: '2024-01-25', submissions: 28, totalStudents: 35 },
    { id: 2, title: 'Algorithm Analysis', dueDate: '2024-02-01', submissions: 20, totalStudents: 35 },
    { id: 3, title: 'Final Project', dueDate: '2024-02-15', submissions: 35, totalStudents: 35 },
  ];

  const announcements = [
    { id: 1, title: 'Lecture Hall Changed', date: '2024-01-14', content: 'Tomorrow\'s lecture moved to Room 301...' },
    { id: 2, title: 'Office Hours Extended', date: '2024-01-13', content: 'Extra office hours this week...' },
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return 'picture-as-pdf';
      case 'doc': return 'description';
      default: return 'insert-drive-file';
    }
  };

  const getSubmissionProgress = (submissions, total) => {
    return Math.round((submissions / total) * 100);
  };

  const renderMaterialItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.cardBg }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
        <MaterialIcons name={getFileIcon(item.type)} size={24} color={colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.textDim }]}>{item.size}</Text>
          <View style={styles.downloadInfo}>
            <MaterialIcons name="download" size={14} color={colors.textDim} />
            <Text style={[styles.metaText, { color: colors.textDim }]}>{item.downloads}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="more-vert" size={20} color={colors.textDim} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderAssignmentItem = ({ item }) => {
    const progress = getSubmissionProgress(item.submissions, item.totalStudents);
    return (
      <TouchableOpacity style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <View style={styles.cardContent}>
          <View style={styles.assignmentHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
            <View style={[styles.progressBadge, { 
              backgroundColor: progress === 100 ? colors.success + '20' : colors.warning + '20' 
            }]}>
              <Text style={[styles.progressText, { 
                color: progress === 100 ? colors.success : colors.warning 
              }]}>
                {progress}%
              </Text>
            </View>
          </View>
          <View style={styles.assignmentMeta}>
            <View style={styles.metaItem}>
              <MaterialIcons name="assignment" size={16} color={colors.textDim} />
              <Text style={[styles.metaText, { color: colors.textDim }]}>
                {item.submissions}/{item.totalStudents} submitted
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={16} color={colors.textDim} />
              <Text style={[styles.metaText, { color: colors.textDim }]}>Due {item.dueDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAnnouncementItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
        <MaterialIcons name="campaign" size={20} color={colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.dateText, { color: colors.textDim }]}>{item.date}</Text>
        <Text style={[styles.contentText, { color: colors.text }]} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="edit" size={18} color={colors.textDim} />
      </TouchableOpacity>
    </View>
  );

  const handleAdd = (type) => {
    setModalType(type);
    setFormData({});
    setModalVisible(true);
  };

  const renderModal = () => (
    <Modal animationType="slide" transparent visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Add {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color={colors.textDim} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
            placeholder="Enter title"
            placeholderTextColor={colors.textDim}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          
          {modalType === 'assignment' && (
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Due date (YYYY-MM-DD)"
              placeholderTextColor={colors.textDim}
              value={formData.dueDate}
              onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
            />
          )}
          
          {modalType === 'announcement' && (
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.inputBg, color: colors.text }]}
              placeholder="Enter announcement content"
              placeholderTextColor={colors.textDim}
              multiline
              numberOfLines={4}
              value={formData.content}
              onChangeText={(text) => setFormData({ ...formData, content: text })}
            />
          )}
          
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.submitButtonText, { color: colors.primaryTextOn }]}>
              Create {modalType}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'materials':
        return <FlatList data={materials} renderItem={renderMaterialItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />;
      case 'assignments':
        return <FlatList data={assignments} renderItem={renderAssignmentItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />;
      case 'announcements':
        return <FlatList data={announcements} renderItem={renderAnnouncementItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <LinearGradient colors={[colors.primary, colors.primary + 'cc']} style={styles.header}>
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <View style={styles.courseIdBadge}>
              <Text style={styles.courseIdText}>{courseID}</Text>
            </View>
            <View style={styles.studentsInfo}>
              <MaterialIcons name="people" size={18} color="rgba(255,255,255,0.9)" />
              <Text style={styles.studentsText}>{students}</Text>
            </View>
          </View>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <Text style={styles.sectionText}>{section}</Text>
        </View>
      </LinearGradient>

      <View style={[styles.tabContainer, { backgroundColor: colors.cardBg }]}>
        {['materials', 'assignments', 'announcements'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: colors.primary + '15' }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { 
              color: activeTab === tab ? colors.primary : colors.textDim,
              fontWeight: activeTab === tab ? '600' : '500'
            }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderTabContent()}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => handleAdd(activeTab.slice(0, -1))}
      >
        <MaterialIcons name="add" size={24} color={colors.primaryTextOn} />
      </TouchableOpacity>

      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  courseInfo: { marginTop: 8 },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseIdBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseIdText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  studentsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentsText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  courseTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sectionText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabText: { fontSize: 14 },
  listContent: { padding: 16, paddingTop: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: { fontSize: 12 },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  assignmentMeta: { gap: 6 },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    marginBottom: 6,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width - 32,
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});