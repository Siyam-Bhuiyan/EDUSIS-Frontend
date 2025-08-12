import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function Students() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Demo data
  const students = [
    { id: '210041215', name: 'John Doe', department: 'CSE', semester: '4th', cgpa: '3.75' },
    { id: '210041216', name: 'Jane Smith', department: 'EEE', semester: '4th', cgpa: '3.85' },
    { id: '210041217', name: 'Mike Johnson', department: 'CSE', semester: '4th', cgpa: '3.90' },
    { id: '210041218', name: 'Sarah Williams', department: 'ME', semester: '4th', cgpa: '3.70' },
    { id: '210041219', name: 'David Brown', department: 'CSE', semester: '4th', cgpa: '3.95' },
  ];

  const StudentCard = ({ student, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={[styles.card, { backgroundColor: colors.cardBg }]}
    >
      <View style={styles.cardHeader}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <MaterialIcons name="person" size={24} color="white" />
        </LinearGradient>
        <View style={styles.headerInfo}>
          <Text style={[styles.name, { color: colors.text }]}>{student.name}</Text>
          <Text style={[styles.id, { color: colors.textDim }]}>ID: {student.id}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color={colors.textDim} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textDim }]}>Department</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{student.department}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textDim }]}>Semester</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{student.semester}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.textDim }]}>CGPA</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{student.cgpa}</Text>
          </View>
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
          placeholder="Search students..."
          placeholderTextColor={colors.textDim}
          style={[styles.searchInput, { color: colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <MaterialIcons name="person-add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content}>
        {students.map((student, index) => (
          <StudentCard key={student.id} student={student} index={index} />
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginBottom: 4,
  },
  id: {
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});