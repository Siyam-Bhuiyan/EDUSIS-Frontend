import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import AdminDashboard from '../../components/admin/AdminDashboard';
import Courses from '../../components/admin/Courses';
import Students from '../../components/admin/Students';
import Teachers from '../../components/admin/Teachers';
import StudentEnrollment from '../../components/admin/StudentEnrollment';
import TeacherEnrollment from '../../components/admin/TeacherAssignment';
import Profile from '../../components/admin/profile';

// Shared UI Components
import Sidebar from '../../components/layout/Sidebar';
import AppShell from '../../components/layout/AppShell';

const Drawer = createDrawerNavigator();

/** Helper to wrap any screen with the global AppShell */
const withShell = (Component, shellProps) => (props) =>
  (
    <AppShell {...shellProps}>
      <Component {...props} />
    </AppShell>
  );

export default function AdminNavigator() {
  // Sidebar "Quick Actions" for admins
  const quickActions = [
    { id: 'students', title: 'Students', icon: 'people', screen: 'Students' },
    { id: 'teachers', title: 'Teachers', icon: 'school', screen: 'Teachers' },
    { id: 'courses', title: 'Courses', icon: 'menu-book', screen: 'Courses' },
    { id: 'student-enrollment', title: 'Student Enrollment', icon: 'how-to-reg', screen: 'StudentEnrollment' },
    { id: 'teacher-assignment', title: 'Teacher Assignment', icon: 'person-add', screen: 'TeacherAssignment' },
  ];

  const footerActions = [
    { id: 'settings', title: 'Settings', icon: 'settings', screen: 'AdminDashboard' },
    { id: 'help', title: 'Help & Support', icon: 'help-outline', screen: 'AdminDashboard' },
  ];

  const user = { name: 'Administrator', sub: 'Super Admin' };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: 290 },
        overlayColor: 'rgba(0,0,0,0.25)',
        swipeEdgeWidth: 80,
        gestureEnabled: true,
      }}
      drawerContent={(props) => (
        <Sidebar
          {...props}
          user={user}
          brandTitle="Quick Actions"
          quickActions={quickActions}
          footerActions={footerActions}
        />
      )}
    >
      <Drawer.Screen
        name="AdminDashboard"
        component={withShell(AdminDashboard, {
          title: 'Admin',
          subtitle: 'Dashboard',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Courses"
        component={withShell(Courses, {
          title: 'Courses',
          subtitle: 'Manage Courses',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Students"
        component={withShell(Students, {
          title: 'Students',
          subtitle: 'Manage Students',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Teachers"
        component={withShell(Teachers, {
          title: 'Teachers',
          subtitle: 'Manage Teachers',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="StudentEnrollment"
        component={withShell(StudentEnrollment, {
          title: 'Student Enrollment',
          subtitle: 'Manage Student Enrollment',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="how-to-reg" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TeacherAssignment"
        component={withShell(TeacherEnrollment, {
          title: 'Teacher Assignment',
          subtitle: 'Manage Teacher Assignment'
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person-add" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={withShell(Profile, {
          title: 'Profile',
          subtitle: 'Manage Profile',
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
