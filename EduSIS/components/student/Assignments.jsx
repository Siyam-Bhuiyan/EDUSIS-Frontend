import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

const Assignments = () => {
  const { colors } = useTheme();

  const items = [
    {
      id: 1,
      title: "DBMS Project Proposal",
      course: "CSE-205",
      description:
        "Create a comprehensive database design proposal for a library management system",
      due: "Aug 18, 11:59 PM",
      points: 100,
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Networks Quiz Preparation",
      course: "CSE-301",
      description:
        "Prepare for the upcoming quiz on TCP/UDP protocols and network layers",
      due: "Aug 15, 10:00 AM",
      points: 50,
      status: "upcoming",
      priority: "medium",
    },
    {
      id: 3,
      title: "Algorithm Analysis Report",
      course: "CSE-401",
      description: "Analyze time and space complexity of sorting algorithms",
      due: "Aug 20, 5:00 PM",
      points: 75,
      status: "draft",
      priority: "medium",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "#fef3c7", color: "#d97706" };
      case "upcoming":
        return { bg: "#dbeafe", color: "#2563eb" };
      case "draft":
        return { bg: "#f3f4f6", color: "#6b7280" };
      case "submitted":
        return { bg: "#dcfce7", color: "#16a34a" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "remove";
      case "low":
        return "keyboard-arrow-down";
      default:
        return "remove";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Assignments
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textDim }]}>
          Track your pending tasks and deadlines
        </Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.statIcon}>
            <MaterialIcons name="pending-actions" size={20} color="#f59e0b" />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {
                items.filter(
                  (item) =>
                    item.status === "pending" || item.status === "upcoming"
                ).length
              }
            </Text>
            <Text style={[styles.statLabel, { color: colors.textDim }]}>
              Pending
            </Text>
          </View>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIcon, { backgroundColor: "#dcfce7" }]}>
            <MaterialIcons
              name="assignment-turned-in"
              size={20}
              color="#16a34a"
            />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {items.filter((item) => item.status === "submitted").length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textDim }]}>
              Completed
            </Text>
          </View>
        </View>
      </View>

      {/* Assignments List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment" size={64} color={colors.textDim} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Assignments
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textDim }]}>
              You're all caught up! Check back later for new assignments.
            </Text>
          </View>
        ) : (
          items.map((item) => {
            const statusStyle = getStatusColor(item.status);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.assignmentCard,
                  { backgroundColor: colors.cardBg },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.assignmentInfo}>
                    <View
                      style={[
                        styles.courseBadge,
                        { backgroundColor: colors.primary + "15" },
                      ]}
                    >
                      <Text
                        style={[styles.courseCode, { color: colors.primary }]}
                      >
                        {item.course}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: statusStyle.color },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons
                    name={getPriorityIcon(item.priority)}
                    size={20}
                    color={item.priority === "high" ? "#ef4444" : "#6b7280"}
                  />
                </View>

                <Text
                  style={[styles.assignmentTitle, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <Text
                  style={[styles.description, { color: colors.textDim }]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>

                <View style={styles.assignmentDetails}>
                  <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                      <MaterialIcons
                        name="schedule"
                        size={16}
                        color="#6b7280"
                      />
                    </View>
                    <Text
                      style={[styles.detailText, { color: colors.textDim }]}
                    >
                      Due {item.due}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                      <MaterialIcons name="stars" size={16} color="#6b7280" />
                    </View>
                    <Text
                      style={[styles.detailText, { color: colors.textDim }]}
                    >
                      {item.points} points
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <MaterialIcons name="open-in-new" size={16} color="#fff" />
                  <Text style={styles.actionButtonText}>
                    {item.status === "submitted"
                      ? "View Submission"
                      : "Start Working"}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Assignments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // Header Styles
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
  },

  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },

  // List Styles
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Assignment Card Styles
  assignmentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  assignmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  courseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  assignmentDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
