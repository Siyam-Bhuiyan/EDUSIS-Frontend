import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import AdminDashboard from '../../components/AdminDashboard';

// Shared beautiful sidebar
import Sidebar from '../../components/Sidebar';

const Drawer = createDrawerNavigator();

export default function AdminNavigator() {
  // Sidebar "Quick Actions" for admins
  const quickActions = [
    { id: 1, title: 'Student/Faculty Mgmt', icon: 'people', screen: 'AdminDashboard' },
    { id: 2, title: 'Departments', icon: 'account-tree', screen: 'AdminDashboard' },
    { id: 3, title: 'Courses', icon: 'menu-book', screen: 'AdminDashboard' },
    { id: 4, title: 'Assign Teachers', icon: 'person-add', screen: 'AdminDashboard' },
    { id: 5, title: 'Enroll Students', icon: 'how-to-reg', screen: 'AdminDashboard' },
    { id: 6, title: 'System Oversight', icon: 'admin-panel-settings', screen: 'AdminDashboard' },
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
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
      {/* Later: add Users, Departments, Courses, Enrollment screens */}
    </Drawer.Navigator>
  );
}
