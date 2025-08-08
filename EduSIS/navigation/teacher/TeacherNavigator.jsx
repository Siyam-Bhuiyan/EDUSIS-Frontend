import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import TeacherDashboard from '../../components/TeacherDashboard';

// Shared beautiful sidebar
import Sidebar from '../../components/Sidebar';

const Drawer = createDrawerNavigator();

export default function TeacherNavigator() {
  // Sidebar "Quick Actions" for teachers
  const quickActions = [
    { id: 1, title: 'Announcements', icon: 'campaign', screen: 'TeacherDashboard' },
    { id: 2, title: 'Online Classes', icon: 'videocam', screen: 'TeacherDashboard' },
    { id: 3, title: 'Files & Assignments', icon: 'upload-file', screen: 'TeacherDashboard' },
    { id: 4, title: 'Grading', icon: 'grading', screen: 'TeacherDashboard' },
    { id: 5, title: 'Calendar', icon: 'event', screen: 'TeacherDashboard' },
  ];

  const footerActions = [
    { id: 'settings', title: 'Settings', icon: 'settings', screen: 'TeacherDashboard' },
    { id: 'help', title: 'Help & Support', icon: 'help-outline', screen: 'TeacherDashboard' },
  ];

  const user = { name: 'Dr. Smith', sub: 'Faculty — CSE' };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: 280 },
        overlayColor: 'rgba(0,0,0,0.25)',
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
      <Drawer.Screen name="TeacherDashboard" component={TeacherDashboard} />
      {/* Later: add Announcements, Classes, Grading, Calendar screens */}
    </Drawer.Navigator>
  );
}
