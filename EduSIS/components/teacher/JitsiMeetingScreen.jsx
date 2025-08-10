import React from "react";
import { View, StyleSheet } from "react-native";
import JitsiCall from "../JitsiCall";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function JitsiMeetingScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    room = "edusis-demo-room",
    subject = "EDUSIS Live Class",
    user = { name: "Teacher", email: "" },
    serverURL, // optional
  } = route.params || {};

  return (
    <View style={styles.screen}>
      <JitsiCall
        room={room}
        subject={subject}
        user={user}
        serverURL={serverURL}
        onEnd={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#000" },
});
