import React, { useMemo, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Platform, Alert, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

/**
 * Reusable Jitsi call via WebView
 * Props:
 * - room: string                // unique room (e.g. "edusis-CSE-301-17000000")
 * - subject?: string            // meeting subject shown in UI
 * - user?: { name?: string, email?: string }
 * - onEnd?: () => void          // called when user hits hangup/back
 * - serverURL?: string          // default: https://meet.jit.si
 */
export default function JitsiCall({
  room,
  subject = "EDUSIS Live Class",
  user = { name: "Teacher", email: "" },
  onEnd,
  serverURL = "https://meet.jit.si",
}) {
  const [loading, setLoading] = useState(true);
  const webRef = useRef(null);

  // Jitsi IFrame URL params (hide prejoin, set display name, start with mic/cam on)
  const jitsiUrl = useMemo(() => {
    const url = new URL(`${serverURL}/${encodeURIComponent(room)}`);
    const params = {
      // UI tweaks
      "config.prejoinConfig.enabled": "false",
      "config.disableDeepLinking": "true",
      "config.toolbarButtons": JSON.stringify([
        "microphone","camera","desktop","fullscreen","fodeviceselection",
        "hangup","chat","participants-pane","raisehand","tileview","select-background",
      ]),
      // name + subject
      "userInfo.displayName": user?.name || "EDUSIS User",
      "userInfo.email": user?.email || "",
      "config.subject": subject,
      // start muted toggles (set to true if you want off by default)
      "config.startWithAudioMuted": "false",
      "config.startWithVideoMuted": "false"
    };

    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  }, [room, subject, user?.name, user?.email, serverURL]);

  // Android hardware back to end meeting
  React.useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onEnd?.();
      return true;
    });
    return () => sub.remove();
  }, [onEnd]);

  // Receive postMessage from the Jitsi page (we inject a listener below)
  const onMessage = (e) => {
    try {
      const data = JSON.parse(e.nativeEvent.data || "{}");
      if (data?.type === "CONFERENCE_LEFT") {
        onEnd?.();
      }
    } catch (_) {}
  };

  // Inject small script to emit “CONFERENCE_LEFT” when hangup happens
  const injectedJS = `
    (function() {
      try {
        // Hook into Jitsi IFrame API events
        const send = (payload) => window.ReactNativeWebView?.postMessage(JSON.stringify(payload));
        const observer = new MutationObserver(function(mutations) {
          // naive: when the large "You left the meeting" container appears OR
          // when the hangup button is clicked, try to emit event.
          const hangupBtn = document.querySelector('[id^="hangup"]');
          if (hangupBtn && !hangupBtn.__patched) {
            hangupBtn.__patched = true;
            hangupBtn.addEventListener('click', () => {
              setTimeout(() => send({ type: 'CONFERENCE_LEFT' }), 300);
            });
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      } catch (e) {}
      true;
    })();
  `;

  return (
    <View style={styles.wrap}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ uri: jitsiUrl }}
        onLoadEnd={() => setLoading(false)}
        onMessage={onMessage}
        injectedJavaScript={injectedJS}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        // Recommended for permissions inside WebView
        allowsFullscreenVideo
        // Android permissions prompt helper
        onError={(e) => {
          Alert.alert("Jitsi Error", e?.nativeEvent?.description || "Failed to load meeting.");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#000" },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
