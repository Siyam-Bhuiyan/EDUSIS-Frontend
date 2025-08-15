import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AdmitCards = () => {
  const { colors, isDark } = useTheme();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Demo data for students
  const [students] = useState([
    { id: '210041101', name: 'Ahmed Rahman', course: 'CSE', semester: '8th', email: 'ahmed@student.edu' },
    { id: '210041102', name: 'Fatima Khan', course: 'CSE', semester: '8th', email: 'fatima@student.edu' },
    { id: '210041103', name: 'Mohammad Ali', course: 'CSE', semester: '8th', email: 'ali@student.edu' },
    { id: '210041104', name: 'Sarah Ahmed', course: 'CSE', semester: '8th', email: 'sarah@student.edu' },
    { id: '210041105', name: 'Hassan Ibrahim', course: 'CSE', semester: '8th', email: 'hassan@student.edu' },
  ]);

  // Demo data for admit cards
  const [admitCards, setAdmitCards] = useState([
    {
      id: 1,
      studentId: '210041101',
      studentName: 'Ahmed Rahman',
      examType: 'Final Exam',
      semester: '8th',
      uploadDate: '2024-01-15',
      fileName: 'admit_card_ahmed.pdf',
      status: 'uploaded'
    },
    {
      id: 2,
      studentId: '210041102',
      studentName: 'Fatima Khan',
      examType: 'Mid Term',
      semester: '8th',
      uploadDate: '2024-01-14',
      fileName: 'admit_card_fatima.pdf',
      status: 'uploaded'
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery)
  );

  const handleDocumentPick = async () => {
    try {
      // For demo purposes, simulate file selection
      const mockFile = {
        name: 'admit_card_sample.pdf',
        uri: 'file://sample.pdf',
        size: 1024000
      };
      
      setSelectedFile(mockFile);
      Alert.alert('Success', 'Sample PDF file selected');
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleUpload = () => {
    if (!selectedStudent || !selectedFile) {
      Alert.alert('Error', 'Please select a student and admit card file');
      return;
    }

    const newAdmitCard = {
      id: admitCards.length + 1,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      examType: 'Final Exam',
      semester: selectedStudent.semester,
      uploadDate: new Date().toISOString().split('T')[0],
      fileName: selectedFile.name,
      status: 'uploaded'
    };

    setAdmitCards([...admitCards, newAdmitCard]);
    setShowUploadModal(false);
    setSelectedStudent(null);
    setSelectedFile(null);
    Alert.alert('Success', 'Admit card uploaded successfully');
  };

  const handleDeleteAdmitCard = (id) => {
    Alert.alert(
      'Delete Admit Card',
      'Are you sure you want to delete this admit card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAdmitCards(admitCards.filter(card => card.id !== id));
          }
        }
      ]
    );
  };

  const StudentCard = ({ student, onSelect }) => (
    <TouchableOpacity
      style={[styles.studentCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
      onPress={() => onSelect(student)}
      activeOpacity={0.7}
    >
      <View style={styles.studentInfo}>
        <View style={[styles.studentAvatar, { backgroundColor: colors.primary + '20' }]}>
          <MaterialIcons name="person" size={24} color={colors.primary} />
        </View>
        <View style={styles.studentDetails}>
          <Text style={[styles.studentName, { color: colors.text }]}>{student.name}</Text>
          <Text style={[styles.studentId, { color: colors.textSecondary }]}>ID: {student.id}</Text>
          <Text style={[styles.studentCourse, { color: colors.textSecondary }]}>
            {student.course} - {student.semester} Semester
          </Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const AdmitCardItem = ({ item }) => (
    <Animated.View
      entering={FadeInDown}
      style={[styles.admitCardItem, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
    >
      <View style={styles.admitCardHeader}>
        <View style={[styles.examTypeIcon, { backgroundColor: colors.success + '20' }]}>
          <MaterialIcons name="assignment" size={20} color={colors.success} />
        </View>
        <View style={styles.admitCardInfo}>
          <Text style={[styles.admitCardTitle, { color: colors.text }]}>{item.studentName}</Text>
          <Text style={[styles.admitCardSubtitle, { color: colors.textSecondary }]}>
            ID: {item.studentId} • {item.examType}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAdmitCard(item.id)}
        >
          <MaterialIcons name="delete" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.admitCardDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="calendar-today" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            Uploaded: {item.uploadDate}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="description" size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {item.fileName}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Admit Cards</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Manage student admit cards
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
            <MaterialIcons name="assignment" size={24} color={colors.primary} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>{admitCards.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Cards</Text>
          </View>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
            <MaterialIcons name="cloud-upload" size={24} color={colors.success} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>{students.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Students</Text>
          </View>
        </View>
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        style={[styles.uploadButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowUploadModal(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.uploadButtonText}>Upload Admit Card</Text>
      </TouchableOpacity>

      {/* Admit Cards List */}
      <FlatList
        data={admitCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AdmitCardItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No Admit Cards</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Upload admit cards for students to access
            </Text>
          </View>
        }
      />

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.bg }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Upload Admit Card</Text>
            <TouchableOpacity
              onPress={() => setShowUploadModal(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Search Students */}
            <View style={styles.searchContainer}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Student</Text>
              <View style={[styles.searchInput, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                <TextInput
                  style={[styles.searchText, { color: colors.text }]}
                  placeholder="Search students..."
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* Students List */}
            <View style={styles.studentsSection}>
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onSelect={setSelectedStudent}
                />
              ))}
            </View>

            {/* Selected Student */}
            {selectedStudent && (
              <View style={styles.selectedSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Selected Student</Text>
                <View style={[styles.selectedCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
                  <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                  <Text style={[styles.selectedText, { color: colors.primary }]}>
                    {selectedStudent.name} ({selectedStudent.id})
                  </Text>
                </View>
              </View>
            )}

            {/* File Selection */}
            <View style={styles.fileSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Admit Card File</Text>
              <TouchableOpacity
                style={[styles.fileButton, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                onPress={handleDocumentPick}
                activeOpacity={0.7}
              >
                <MaterialIcons name="attach-file" size={20} color={colors.primary} />
                <Text style={[styles.fileButtonText, { color: colors.primary }]}>
                  {selectedFile ? selectedFile.name : 'Select PDF File'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Upload Button */}
            <TouchableOpacity
              style={[
                styles.modalUploadButton,
                { 
                  backgroundColor: selectedStudent && selectedFile ? colors.primary : colors.border,
                  opacity: selectedStudent && selectedFile ? 1 : 0.5
                }
              ]}
              onPress={handleUpload}
              disabled={!selectedStudent || !selectedFile}
              activeOpacity={0.8}
            >
              <MaterialIcons name="cloud-upload" size={20} color="#fff" />
              <Text style={styles.modalUploadText}>Upload Admit Card</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  admitCardItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  admitCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  examTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  admitCardInfo: {
    flex: 1,
  },
  admitCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  admitCardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  deleteButton: {
    padding: 8,
  },
  admitCardDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  studentsSection: {
    marginBottom: 20,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 12,
    marginBottom: 2,
  },
  studentCourse: {
    fontSize: 12,
  },
  selectedSection: {
    marginBottom: 20,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  fileSection: {
    marginBottom: 30,
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  fileButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  modalUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  modalUploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AdmitCards;
