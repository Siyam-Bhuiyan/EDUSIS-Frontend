import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import StudentDashboard from "../../components/StudentDashboard";
import Assignments from "../../components/student/Assignments";
import Classes from "../../components/student/Classes";
import Results from "../../components/student/Results";
import Calendar from "../../components/student/Calendar";

import Sidebar from "../../components/Sidebar";

const Drawer = createDrawerNavigator();

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
        headerShown: false, // we render our own header in screens
        drawerType: "slide",
        drawerStyle: { width: 280 },
        overlayColor: "rgba(0,0,0,0.25)",
        swipeEdgeWidth: 80, // swipe from the left edge to open
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
      <Drawer.Screen name="StudentDashboard" component={StudentDashboard} />
      <Drawer.Screen name="Assignments" component={Assignments} />
      <Drawer.Screen name="Classes" component={Classes} />
      <Drawer.Screen name="Results" component={Results} />
      <Drawer.Screen name="Calendar" component={Calendar} />
    </Drawer.Navigator>
  );
}
