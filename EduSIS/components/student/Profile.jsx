import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Helper to format ISO/string dates as DD/MM/YYYY
const formatDate = (dateString) => {
  try {
    const d = new Date(dateString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return dateString || 'Not Available';
  }
};

export default function Profile() {
  // ===== Dummy student data (replace with API later) =====
  const student = useMemo(
    () => ({
      name: 'John Doe',
      student_id: '2021-CSE-101',
      department: 'Computer Science & Engineering',
      program: 'BSc in CSE',
      semester: '5th',
      cgpa: '3.72',
      credits_earned: 78,
      email: 'john.doe@example.edu',
      phone_number: '+880-1711-000000',
      address: 'Dhaka, Bangladesh 1205',
      date_of_birth: '2003-02-14',
      blood_group: 'O+',
      emergency_contact: { name: 'Jane Doe', relationship: 'Mother', phone: '+880-1811-111111' },
      country: 'Bangladesh',
      avatar: require('../../assets/profile.jpg'),
    }),
    []
  );

  const infoCards = [
    { label: "Father's Name", value: 'Richard Doe', icon: null },
    { label: "Mother's Name", value: 'Jane Doe', icon: null },
    { label: 'Date of Birth', value: formatDate(student.date_of_birth), icon: null },
    { label: 'Address', value: student.address, icon: 'map-marker-alt' },
    { label: 'Phone', value: student.phone_number, icon: 'phone' },
    { label: 'Email', value: student.email, icon: 'envelope' },
    { label: 'Blood Group', value: student.blood_group, icon: 'tint' },
    { label: 'Program', value: student.program, icon: 'university' },
    { label: 'CGPA', value: student.cgpa, icon: 'chart-line' },
    { label: 'Credits Earned', value: `${student.credits_earned}`, icon: 'check-circle' },
    { label: 'Emergency Contact Name', value: student.emergency_contact?.name, icon: 'user-friends' },
    { label: 'Relationship', value: student.emergency_contact?.relationship, icon: 'users' },
    { label: 'Emergency Contact Phone', value: student.emergency_contact?.phone, icon: 'phone' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Image source={student.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.sub}>
            <Text style={styles.bold}>ID:</Text> {student.student_id}
          </Text>
          <Text style={styles.sub}>
            <Text style={styles.bold}>Country:</Text> {student.country || 'Not Available'}
          </Text>
          <Text style={styles.sub}>
            <Text style={styles.bold}>Department:</Text> {student.department || 'Not Available'}
          </Text>
          <Text style={styles.sub}>
            <Text style={styles.bold}>Semester:</Text> {student.semester || '—'}
          </Text>
        </View>
      </View>

      {/* Account Quick Actions */}
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickBtn} activeOpacity={0.85}>
          <MaterialIcons name="edit" size={18} color="#fff" />
          <Text style={styles.quickText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} activeOpacity={0.85}>
          <MaterialIcons name="lock" size={18} color="#fff" />
          <Text style={styles.quickText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} activeOpacity={0.85}>
          <MaterialIcons name="notifications" size={18} color="#fff" />
          <Text style={styles.quickText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="address-card" size={16} color="#1e90ff" /> Personal Details
        </Text>

        {infoCards.map((info, idx) =>
          info.value ? (
            <View
              key={`${info.label}-${idx}`}
              style={[styles.infoRow, idx % 2 === 0 ? styles.even : styles.odd]}
            >
              <View style={styles.infoLeft}>
                {info.icon ? (
                  <FontAwesome5
                    name={info.icon}
                    size={14}
                    color="#1e90ff"
                    style={{ marginRight: 8 }}
                  />
                ) : null}
                <Text style={styles.infoLabel}>{info.label}</Text>
              </View>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ) : null
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },

  headerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    marginBottom: 16,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  name: { fontSize: 20, fontWeight: '800', color: '#2c3e50' },
  sub: { fontSize: 13, color: '#7f8c8d', marginTop: 2 },
  bold: { fontWeight: '700', color: '#2c3e50' },

  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    elevation: 2,
  },
  quickText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 8,
    marginLeft: 4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  even: { backgroundColor: '#f9fbfe' },
  odd: { backgroundColor: '#ffffff' },

  infoLeft: { flexDirection: 'row', alignItems: 'center', flex: 0.9 },
  infoLabel: { fontSize: 14, color: '#34495e', fontWeight: '700' },
  infoValue: { flex: 1.1, textAlign: 'right', fontSize: 14, color: '#2c3e50', fontWeight: '600' },
});
