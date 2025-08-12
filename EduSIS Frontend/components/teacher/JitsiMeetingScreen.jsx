// path: components/teacher/JitsiMeetingScreen.jsx
import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { WebView } from "react-native-webview";

// Very simple in-app Jitsi using WebView
export default function JitsiMeetingScreen({ route }) {
  const { room = "edusis-room", subject = "EDUSIS Class", user = { name: "Guest" } } =
    route?.params || {};

  // Build a clean Jitsi URL (meet.jit.si works without auth by default)
  const jitsiUrl = useMemo(() => {
    const base = `https://meet.jit.si/${encodeURIComponent(room)}`;
    const ui =
      "#config.disableDeepLinking=true&config.prejoinConfig.enabled=true&interfaceConfig.DISABLE_JOIN_LEAVE_NOTIFICATIONS=true";
    return base + ui;
  }, [room]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: jitsiUrl }}
        startInLoadingState
        incognito
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        setSupportMultipleWindows={false}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
        // Improve Android autoplay
        {...(Platform.OS === "android" ? { mixedContentMode: "always" } : {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
});
