import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens (content only; no headers inside them)
import StudentDashboard from "../../components/StudentDashboard";
import Assignments from "../../components/student/Assignments";
import Classes from "../../components/student/Messages";
import Results from "../../components/student/Results";
import Calendar from "../../components/student/Calendar";
import Profile from "../../components/student/Profile";

// Shared UI
import Sidebar from "../../components/Sidebar";
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
    { id: 2, title: "Classes", icon: "class", screen: "Classes" },
    { id: 3, title: "Results", icon: "assessment", screen: "Results" },
    { id: 4, title: "Calendar", icon: "event", screen: "Calendar" },
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
      />
      <Drawer.Screen
        name="Assignments"
        component={withShell(Assignments, {
          title: "Student",
          subtitle: "Assignments",
        })}
      />
      <Drawer.Screen
        name="Classes"
        component={withShell(Classes, {
          title: "Student",
          subtitle: "Classes",
        })}
      />
      <Drawer.Screen
        name="Results"
        component={withShell(Results, {
          title: "Student",
          subtitle: "Results",
        })}
      />
      <Drawer.Screen
        name="Calendar"
        component={withShell(Calendar, {
          title: "Student",
          subtitle: "Calendar",
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={withShell(Profile, {
          title: "Student",
          subtitle: "Profile",
        })}
      />
    </Drawer.Navigator>
  );
}
