import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const StudentDashboard = ({ navigation }) => {
  // Minimal, clean dashboard — NO quick actions here (they live in Sidebar)
  const studentName = 'John Doe';
  const studentId = '2021-CSE-101';

  const courses = [
    { id: 1, name: 'Computer Networks', teacher: 'Dr. Smith', progress: 75 },
    { id: 2, name: 'Database Systems', teacher: 'Prof. Johnson', progress: 60 },
    { id: 3, name: 'Software Engineering', teacher: 'Dr. Williams', progress: 85 },
  ];

  const upcoming = [
    { id: 1, title: 'Networks Quiz', date: { day: '15', month: 'AUG' }, time: '10:00 AM' },
    { id: 2, title: 'DB Project Due', date: { day: '18', month: 'AUG' }, time: '11:59 PM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom header with Sidebar (Drawer) button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuBtn}
          accessibilityRole="button"
          accessibilityLabel="Open sidebar"
        >
          <MaterialIcons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Welcome, {studentName}</Text>
          <Text style={styles.headerSub}>Student ID: {studentId}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          {/* Courses */}
          <Text style={styles.sectionTitle}>My Courses</Text>
          <View style={styles.grid}>
            {courses.map((c) => (
              <View key={c.id} style={styles.courseBox}>
                <View style={styles.courseHeader}>
                  <Text style={styles.courseTitle}>{c.name}</Text>
                </View>
                <Text style={styles.courseTeacher}>{c.teacher}</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${c.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{c.progress}% Complete</Text>
              </View>
            ))}
          </View>

          {/* Upcoming */}
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcoming.map((e) => (
            <View key={e.id} style={styles.eventRow}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDay}>{e.date.day}</Text>
                <Text style={styles.eventMonth}>{e.date.month}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.eventTime}>{e.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 12,
    paddingTop: 48,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuBtn: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  headerSub: { fontSize: 12, color: '#ffffffcc', marginTop: 2 },

  scroll: { flex: 1 },
  content: { padding: 14 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: 12,
    marginLeft: 4,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  courseBox: {
    width: width * 0.44,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  courseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  courseTitle: { fontSize: 15, fontWeight: '600', color: '#2c3e50', flex: 1 },
  courseTeacher: { fontSize: 13, color: '#7f8c8d' },
  progressTrack: { height: 4, backgroundColor: '#ecf0f1', borderRadius: 2, marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: '#1e90ff', borderRadius: 2 },
  progressText: { fontSize: 12, color: '#7f8c8d', textAlign: 'right', marginTop: 4 },

  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  eventDate: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventDay: { color: '#fff', fontSize: 18, fontWeight: '700' },
  eventMonth: { color: '#fff', fontSize: 12 },
  eventTitle: { fontSize: 16, fontWeight: '600', color: '#2c3e50' },
  eventTime: { fontSize: 13, color: '#7f8c8d', marginTop: 2 },
});
