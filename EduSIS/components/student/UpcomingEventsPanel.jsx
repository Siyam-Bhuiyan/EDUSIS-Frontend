import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const PANEL_WIDTH = Math.min(360, Math.round(width * 0.86));

export default function UpcomingEventsPanel({ visible, onClose, events = [] }) {
  const x = useRef(new Animated.Value(PANEL_WIDTH)).current; // off-screen right

  useEffect(() => {
    Animated.timing(x, {
      toValue: visible ? 0 : PANEL_WIDTH,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <>
      {/* Dim overlay */}
      {visible && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      )}

      {/* Right slide panel */}
      <Animated.View
        style={[
          styles.panel,
          { transform: [{ translateX: x }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Upcoming Events</Text>
          <TouchableOpacity onPress={onClose} style={styles.iconBtn} accessibilityLabel="Close events panel">
            <MaterialIcons name="close" size={22} color="#2c3e50" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 14 }}>
          {events.length === 0 ? (
            <Text style={styles.empty}>No upcoming events.</Text>
          ) : events.map((e) => (
            <View key={e.id} style={styles.eventCard}>
              <View style={styles.dateBox}>
                <Text style={styles.day}>{e.date.day}</Text>
                <Text style={styles.month}>{e.date.month}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.time}>{e.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: PANEL_WIDTH,
    bottom: 0,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  header: {
    paddingHorizontal: 14,
    paddingTop: 48,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 18, fontWeight: '800', color: '#2c3e50', flex: 1 },
  iconBtn: { padding: 8 },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f9fc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateBox: {
    width: 50, height: 50, borderRadius: 8, backgroundColor: '#1e90ff',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  day: { color: '#fff', fontSize: 18, fontWeight: '800' },
  month: { color: '#fff', fontSize: 12, opacity: 0.9 },
  eventTitle: { fontSize: 16, fontWeight: '700', color: '#2c3e50' },
  time: { fontSize: 13, color: '#7f8c8d', marginTop: 2 },
  empty: { color: '#7f8c8d', textAlign: 'center', marginTop: 20 },
});
