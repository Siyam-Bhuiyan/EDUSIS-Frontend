import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import Animated, { FadeInUp } from "react-native-reanimated";

const tagStyle = (tag) => {
  switch (tag) {
    case "Quiz":
      return { bg: "#dbeafe", fg: "#3b82f6", icon: "quiz" };
    case "Deadline":
      return { bg: "#fed7aa", fg: "#f97316", icon: "schedule" };
    case "Exam":
      return { bg: "#dcfce7", fg: "#10b981", icon: "school" };
    case "Assignment":
      return { bg: "#fecaca", fg: "#ef4444", icon: "assignment" };
    case "Meeting":
      return { bg: "#e9d5ff", fg: "#8b5cf6", icon: "group" };
    case "Class":
      return { bg: "#fef3c7", fg: "#f59e0b", icon: "class" };
    default:
      return { bg: "#f3f4f6", fg: "#6b7280", icon: "event" };
  }
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AddEventModal({
  visible,
  onClose,
  onSubmit,
  selectedDate,
  currentDate,
  formData,
  setFormData,
}) {
  const { colors } = useTheme();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handleClose = () => {
    setFormData({ title: "", time: "", tag: "Assignment" });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          entering={FadeInUp}
          style={[styles.modalContent, { backgroundColor: colors.card }]}
        >
          {/* Modal Header */}
          <View
            style={[styles.modalHeader, { borderBottomColor: colors.border }]}
          >
            <View style={styles.modalHeaderLeft}>
              <View
                style={[
                  styles.modalIcon,
                  { backgroundColor: colors.primary + "15" },
                ]}
              >
                <MaterialIcons
                  name="event-note"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Add New Event
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.textDim }]}>
                  {selectedDate && `${months[month]} ${selectedDate}, ${year}`}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.modalClose, { backgroundColor: colors.bg }]}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={20} color={colors.textDim} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Event Title */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Event Title
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.bg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
                placeholder="Enter event title"
                placeholderTextColor={colors.textDim}
              />
            </View>

            {/* Event Time */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Time (Optional)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.bg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                value={formData.time}
                onChangeText={(text) =>
                  setFormData({ ...formData, time: text })
                }
                placeholder="e.g., 10:00 AM or All Day"
                placeholderTextColor={colors.textDim}
              />
            </View>

            {/* Category Selection */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Category
              </Text>
              <View style={styles.categoryGrid}>
                {[
                  "Assignment",
                  "Quiz",
                  "Exam",
                  "Deadline",
                  "Meeting",
                  "Class",
                ].map((tag) => {
                  const t = tagStyle(tag);
                  const isSelected = formData.tag === tag;
                  return (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => setFormData({ ...formData, tag })}
                      style={[
                        styles.categoryOption,
                        {
                          backgroundColor: isSelected ? t.fg : t.bg,
                          borderColor: t.fg,
                          borderWidth: isSelected ? 2 : 1,
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name={t.icon}
                        size={18}
                        color={isSelected ? "#fff" : t.fg}
                      />
                      <Text
                        style={[
                          styles.categoryOptionText,
                          { color: isSelected ? "#fff" : t.fg },
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Modal Footer */}
          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              onPress={handleClose}
              style={[
                styles.cancelButton,
                {
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.cancelButtonText, { color: colors.textDim }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    borderRadius: 16,
    padding: 0,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    borderBottomWidth: 1,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  modalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  modalClose: {
    padding: 6,
    borderRadius: 8,
  },
  modalBody: {
    maxHeight: 300,
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
  },
  categoryOptionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
