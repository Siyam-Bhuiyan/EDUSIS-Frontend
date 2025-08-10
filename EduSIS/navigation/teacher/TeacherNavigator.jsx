import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';

// Screens
import TeacherDashboard from '../../components/teacher/TeacherDashboard';
import Announcements from '../../components/teacher/Announcements';
import OnlineClasses from '../../components/teacher/OnlineClasses';
import Assignments from '../../components/teacher/Assignments';
import Calendar from '../../components/teacher/Calendar';
import Profile from '../../components/teacher/Profile';
import AssignGrades from '../../components/teacher/AssignGrades';
import Messages from '../../components/teacher/Messages';

// Shared UI
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

export default function TeacherNavigator() {
  const { colors, isDark } = useTheme();
  
  // Sidebar "Quick Actions" for teachers
  const quickActions = [
    { id: 1, title: 'Announcements', icon: 'campaign', screen: 'Announcements' },
    { id: 2, title: 'Online Classes', icon: 'videocam', screen: 'OnlineClasses' },
    { id: 3, title: 'Assignments', icon: 'assignment', screen: 'Assignments' },
    { id: 4, title: 'Assign Grades', icon: 'grade', screen: 'AssignGrades' },
    { id: 5, title: 'Messages', icon: 'message', screen: 'Messages' },
    { id: 6, title: 'Calendar', icon: 'event', screen: 'Calendar' },
  ];

  const footerActions = [
    { id: 'settings', title: 'Settings', icon: 'settings', screen: 'Settings' },
    { id: 'help', title: 'Help & Support', icon: 'help-outline', screen: 'Help' },
  ];

  const user = { name: 'Dr. Smith', sub: 'Faculty — CSE' };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: 280 },
        overlayColor: 'rgba(0,0,0,0.25)',
        swipeEdgeWidth: 80,
        gestureEnabled: true
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
        name="TeacherDashboard" 
        component={withShell(TeacherDashboard, {
          title: "Teacher Dashboard",
          subtitle: "Manage Your Courses"
        })}
      />

      <Drawer.Screen 
        name="Announcements" 
        component={withShell(Announcements, {
          title: "Announcements",
          subtitle: "Class Updates"
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="announcement" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="OnlineClasses" 
        component={withShell(OnlineClasses, {
          title: "Online Classes",
          subtitle: "Virtual Classroom"
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="video-camera-front" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Assignments" 
        component={withShell(Assignments, {
          title: "Assignments",
          subtitle: "Tasks & Submissions"
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Calendar" 
        component={withShell(Calendar, {
          title: "Calendar",
          subtitle: "Schedule & Events"
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="AssignGrades" 
        component={withShell(AssignGrades, {
          title: "Assign Grades",
          subtitle: "Manage Student Grades"
        })}        
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="grade" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Messages" 
        component={withShell(Messages, {
          title: "Messages",
          subtitle: "Chat with Students"
        })}        
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="message" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="Profile" 
        component={withShell(Profile, {
          title: "Profile",
          subtitle: "Personal Information"
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
