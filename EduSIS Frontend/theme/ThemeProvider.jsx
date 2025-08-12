// theme/ThemeProvider.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, StatusBar, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- Color palettes (edit to match your brand) ---
const paletteLight = {
  bg: "#f5f7fa",
  card: "#ffffff",
  text: "#1f2a37",
  textDim: "#6b7280",
  border: "#e5e7eb",
  primary: "#1e90ff",
  primaryTextOn: "#ffffff",
  // Add these new colors
  appBg: "#f5f7fa",
  screenBg: "#f5f7fa",
  cardBg: "#ffffff",
  cardBorder: "#e5e7eb",
  inputBg: "#ffffff",
  inputBorder: "#dcdde1",
  buttonBg: "#1e90ff",
  buttonText: "#ffffff",
  success: "#2ecc71",
  danger: "#e74c3c",
  warning: "#f1c40f",
};

const paletteDark = {
  bg: "#0b1220",
  card: "#0f172a",
  text: "#e5e7eb",
  textDim: "#94a3b8",
  border: "#243142",
  primary: "#60a5fa",
  primaryTextOn: "#0b1220",
  // Add these new colors
  appBg: "#0b1220",
  screenBg: "#0f172a",
  cardBg: "#1a2234",
  cardBorder: "#2d3748",
  inputBg: "#1a2234",
  inputBorder: "#2d3748",
  buttonBg: "#60a5fa",
  buttonText: "#0b1220",
  success: "#27ae60",
  danger: "#c0392b",
  warning: "#f39c12",
};

const ThemeContext = createContext({
  mode: /** @type{"light"|"dark"|"system"} */ ("system"),
  colors: paletteLight,
  isDark: false,
  setMode: /** @type{(m:"light"|"dark"|"system")=>void} */ (() => {}),
  toggle: () => {},
});

const STORAGE_KEY = "edusis.theme.mode";

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme(); // "light" | "dark"
  const [mode, setMode] = useState(
    /** @type{"light"|"dark"|"system"} */ ("system")
  );

  // Load saved preference once
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark" || saved === "system")
        setMode(saved);
    })();
  }, []);

  // Persist preference
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  }, [mode]);

  // Effective scheme (respects "system")
  const effective = mode === "system" ? systemScheme || "light" : mode;
  const isDark = effective === "dark";

  // Colors to use by components
  const colors = isDark ? paletteDark : paletteLight;

  const setModeSafe = useCallback((m) => setMode(m), []);
  const toggle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ mode, colors, isDark, setMode: setModeSafe, toggle }),
    [mode, colors, isDark, setModeSafe, toggle]
  );

  return (
    <ThemeContext.Provider value={value}>
      {/* Keep status bar readable */}
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={colors.bg}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
