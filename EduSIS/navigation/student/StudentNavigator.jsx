import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

// Screens (content only; no headers inside them)
import StudentDashboard from "../../components/student/StudentDashboard";
import Assignments from "../../components/student/Assignments";
import Messages from "../../components/student/Messages";
import Results from "../../components/student/Results";
import Calendar from "../../components/student/Calendar";
import Profile from "../../components/student/Profile";
import CourseDetail from "../../components/student/CourseDetail";
import AdmitCards from "../../components/student/AdmitCards";

// Shared UI
import Sidebar from "../../components/layout/Sidebar";
import AppShell from "../../components/layout/AppShell";

const Drawer = createDrawerNavigator();

/** Helper to wrap any screen with the global AppShell */
const withShell = (Component, shellProps) => (props) =>
  (
    <AppShell {...shellProps}>
      <Component {...props} />
    </AppShell>
  );

export default function StudentNavigator() {
  const quickActions = [
    { id: 1, title: "Assignments", icon: "assignment", screen: "Assignments" },
    { id: 2, title: "Messages", icon: "class", screen: "Messages" },
    { id: 3, title: "Results", icon: "assessment", screen: "Results" },
    { id: 4, title: "Calendar", icon: "event", screen: "Calendar" },
    {
      id: 5,
      title: "Admit Cards",
      icon: "assignment-ind",
      screen: "AdmitCards",
    },
  ];

  const footerActions = [
    {
      id: "settings",
      title: "Settings",
      icon: "settings",
      screen: "StudentDashboard",
    },
    {
      id: "help",
      title: "Help & Support",
      icon: "help-outline",
      screen: "StudentDashboard",
    },
  ];

  const user = { name: "John Doe", sub: "2021-CSE-101" };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // we render TopBar ourselves
        drawerType: "slide",
        drawerStyle: { width: 280 },
        overlayColor: "rgba(0,0,0,0.25)",
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
        name="StudentDashboard"
        component={withShell(StudentDashboard, {
          title: "Siyam",
          subtitle: "ID: 210041215",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Assignments"
        component={withShell(Assignments, {
          title: "Student",
          subtitle: "Assignments",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={withShell(Messages, {
          title: "Student",
          subtitle: "Messages",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="message" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Results"
        component={withShell(Results, {
          title: "Student",
          subtitle: "Results",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="assessment" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={withShell(Calendar, {
          title: "Student",
          subtitle: "Calendar",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={withShell(Profile, {
          title: "Student",
          subtitle: "Profile",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CourseDetail"
        component={withShell(CourseDetail, {
          title: "Course Details",
          subtitle: "Course Materials & Activities",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AdmitCards"
        component={withShell(AdmitCards, {
          title: "Admit Cards",
          subtitle: "Download Exam Admit Cards",
        })}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="assignment-ind" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
