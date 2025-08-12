import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Entry / Auth
import SplashScreen from '../components/SplashScreen';
import Login from '../components/Login';
import Register from '../components/Register';

// Role-based app areas
import StudentNavigator from './student/StudentNavigator';
import TeacherNavigator from './teacher/TeacherNavigator';
import AdminNavigator from './admin/AdminNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* Entry */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

      {/* App areas with (drawers) */}
      <Stack.Screen name="StudentApp" component={StudentNavigator} />
      <Stack.Screen name="TeacherApp" component={TeacherNavigator} />
      <Stack.Screen name="AdminApp" component={AdminNavigator} />
    </Stack.Navigator>
  );
}
