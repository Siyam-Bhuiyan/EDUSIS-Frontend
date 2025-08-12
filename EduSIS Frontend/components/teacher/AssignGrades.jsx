import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../theme/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

// Demo data
const DEMO_COURSES = [
  { course_id: 'CSE-301', title: 'Computer Networks' },
  { course_id: 'CSE-205', title: 'Database Systems' },
  { course_id: 'CSE-401', title: 'Software Engineering' },
];

const DEMO_STUDENTS = [
  { id: '1', name: 'John Doe', student_id: 'CSE-2021-001' },
  { id: '2', name: 'Jane Smith', student_id: 'CSE-2021-002' },
  { id: '3', name: 'Mike Johnson', student_id: 'CSE-2021-003' },
];

export default function AssignGrades() {
  const { colors } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [grades, setGrades] = useState({
    quiz1: '',
    quiz2: '',
    quiz3: '',
    assignments: '',
    attendance: '',
    midSem: '',
    finalSem: '',
  });

  const handleGradeChange = (field, value) => {
    setGrades(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    const values = Object.values(grades).map(v => Number(v) || 0);
    return values.reduce((a, b) => a + b, 0);
  };

  const calculateGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 85) return 'A';
    if (total >= 80) return 'A-';
    if (total >= 75) return 'B+';
    if (total >= 70) return 'B';
    if (total >= 65) return 'B-';
    if (total >= 60) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  };

  const renderGradeInput = (label, field) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, { 
          backgroundColor: colors.cardBg,
          color: colors.text,
          borderColor: colors.border 
        }]}
        value={grades[field]}
        onChangeText={(value) => handleGradeChange(field, value)}
        keyboardType="numeric"
        maxLength={3}
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={[styles.title, { color: colors.text }]}>Assign Grades</Text>

      {/* Course Selection */}
      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Select Course</Text>
        <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={setSelectedCourse}
            style={{ color: colors.text }}
            dropdownIconColor={colors.primary}
          >
            <Picker.Item label="-- Choose a Course --" value="" />
            {DEMO_COURSES.map(course => (
              <Picker.Item 
                key={course.course_id} 
                label={`${course.course_id}: ${course.title}`} 
                value={course.course_id} 
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Student Selection */}
      {selectedCourse && (
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Select Student</Text>
          <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
            <Picker
              selectedValue={selectedStudent}
              onValueChange={setSelectedStudent}
              style={{ color: colors.text }}
              dropdownIconColor={colors.primary}
            >
              <Picker.Item label="-- Choose a Student --" value="" />
              {DEMO_STUDENTS.map(student => (
                <Picker.Item 
                  key={student.id} 
                  label={`${student.name} (${student.student_id})`} 
                  value={student.id} 
                />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {/* Grade Inputs */}
      {selectedStudent && (
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Enter Grades</Text>
          
          <View style={styles.gradeInputsContainer}>
            {renderGradeInput('Quiz 1 (10)', 'quiz1')}
            {renderGradeInput('Quiz 2 (10)', 'quiz2')}
            {renderGradeInput('Quiz 3 (10)', 'quiz3')}
            {renderGradeInput('Assignments (20)', 'assignments')}
            {renderGradeInput('Attendance (10)', 'attendance')}
            {renderGradeInput('Mid Sem (30)', 'midSem')}
            {renderGradeInput('Final Sem (40)', 'finalSem')}
          </View>

          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, { color: colors.text }]}>
              Total Marks: {calculateTotal()}
            </Text>
            <Text style={[styles.totalText, { color: colors.text }]}>
              Grade: {calculateGrade(calculateTotal())}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              // Handle grade submission
              console.log('Grades submitted:', { 
                course: selectedCourse,
                student: selectedStudent,
                grades,
                total: calculateTotal(),
                grade: calculateGrade(calculateTotal())
              });
            }}
          >
            <Text style={styles.submitButtonText}>Submit Grades</Text>
            <MaterialIcons name="send" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  gradeInputsContainer: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});