import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import AdminDashboard from '../../components/admin/AdminDashboard';

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
    { id: 'students', title: 'Students', icon: 'people', screen: 'AdminDashboard' },
    { id: 'teachers', title: 'Teachers', icon: 'school', screen: 'AdminDashboard' },
    { id: 'courses', title: 'Courses', icon: 'menu-book', screen: 'AdminDashboard' },
    { id: 'departments', title: 'Departments', icon: 'account-tree', screen: 'AdminDashboard' },
    { id: 'enroll', title: 'Student Enrollment', icon: 'how-to-reg', screen: 'AdminDashboard' },
    { id: 'assign', title: 'Teacher Assignment', icon: 'person-add', screen: 'AdminDashboard' },
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
      />
      {/* Add other admin screens here */}
    </Drawer.Navigator>
  );
}
