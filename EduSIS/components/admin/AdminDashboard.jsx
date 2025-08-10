import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AdminDashboard = () => {
  const { colors, isDark } = useTheme();

  const adminActions = [
    { id: 1, title: 'Students', icon: 'people', gradient: ['#4facfe', '#00f2fe'] },
    { id: 2, title: 'Teachers', icon: 'school', gradient: ['#43e97b', '#38f9d7'] },
    { id: 3, title: 'Courses', icon: 'menu-book', gradient: ['#fa709a', '#fee140'] },
    { id: 4, title: 'Departments', icon: 'account-tree', gradient: ['#6a11cb', '#2575fc'] },
    { id: 5, title: 'Student Enrollment', icon: 'how-to-reg', gradient: ['#f77062', '#fe5196'] },
    { id: 6, title: 'Teacher Assignment', icon: 'person-add', gradient: ['#667eea', '#764ba2'] },
  ];

  const ActionCard = ({ title, icon, gradient, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.cardBg }]}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <MaterialIcons name={icon} size={32} color="white" />
        </LinearGradient>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.header, { color: colors.text }]}>Admin Dashboard</Text>
      <Text style={[styles.subheader, { color: colors.textDim }]}>
        Manage your institution efficiently
      </Text>
      
      <View style={styles.grid}>
        {adminActions.map((action, index) => (
          <ActionCard key={action.id} {...action} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
