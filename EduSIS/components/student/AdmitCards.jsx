import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";
import Animated, { FadeInDown } from "react-native-reanimated";

const AdmitCards = () => {
  const { colors, isDark } = useTheme();
  const [downloadingId, setDownloadingId] = useState(null);

  // Demo data - student's admit cards
  const [admitCards] = useState([
    {
      id: 1,
      examType: "Final Exam",
      semester: "8th Semester",
      subject: "Software Engineering",
      examDate: "2024-02-15",
      venue: "Room 301, Building A",
      time: "09:00 AM - 12:00 PM",
      uploadDate: "2024-01-15",
      fileName: "final_admit_card_cse401.pdf",
      status: "available",
      downloadUrl:
        "https://example.com/admit-cards/final_admit_card_cse401.pdf",
    },
    {
      id: 2,
      examType: "Mid Term",
      semester: "8th Semester",
      subject: "Computer Networks",
      examDate: "2024-01-28",
      venue: "Room 205, Building B",
      time: "02:00 PM - 05:00 PM",
      uploadDate: "2024-01-14",
      fileName: "mid_admit_card_cse301.pdf",
      status: "available",
      downloadUrl: "https://example.com/admit-cards/mid_admit_card_cse301.pdf",
    },
    {
      id: 3,
      examType: "Final Exam",
      semester: "8th Semester",
      subject: "Database Systems",
      examDate: "2024-02-20",
      venue: "Room 101, Building C",
      time: "09:00 AM - 12:00 PM",
      uploadDate: "2024-01-16",
      fileName: "final_admit_card_cse205.pdf",
      status: "available",
      downloadUrl:
        "https://example.com/admit-cards/final_admit_card_cse205.pdf",
    },
  ]);

  const handleDownload = async (admitCard) => {
    try {
      setDownloadingId(admitCard.id);

      // For demo purposes, we'll simulate a successful download
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Download Complete",
        `${admitCard.fileName} has been downloaded successfully.`,
        [
          { text: "OK" },
          {
            text: "Open",
            onPress: () => {
              Alert.alert("Info", "File would be opened in PDF viewer");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to download admit card. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleShare = async (admitCard) => {
    try {
      // In a real app, you would share the downloaded file
      Alert.alert("Info", "Admit card would be shared");
    } catch (error) {
      Alert.alert("Error", "Failed to share admit card");
    }
  };

  const getExamTypeColor = (examType) => {
    switch (examType.toLowerCase()) {
      case "final exam":
        return colors.error;
      case "mid term":
        return colors.warning || "#f59e0b";
      default:
        return colors.primary;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const AdmitCardItem = ({ item, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[
        styles.admitCardItem,
        { backgroundColor: colors.cardBg, borderColor: colors.border },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.examTypeIcon,
            { backgroundColor: getExamTypeColor(item.examType) + "20" },
          ]}
        >
          <MaterialIcons
            name="assignment"
            size={20}
            color={getExamTypeColor(item.examType)}
          />
        </View>
        <View style={styles.cardHeaderInfo}>
          <Text
            style={[
              styles.examType,
              { color: getExamTypeColor(item.examType) },
            ]}
          >
            {item.examType}
          </Text>
          <Text style={[styles.subject, { color: colors.text }]}>
            {item.subject}
          </Text>
          <Text style={[styles.semester, { color: colors.textSecondary }]}>
            {item.semester}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: colors.success + "20" },
          ]}
        >
          <MaterialIcons name="check-circle" size={16} color={colors.success} />
        </View>
      </View>

      <View style={styles.examDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <MaterialIcons
              name="event"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {formatDate(item.examDate)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons
              name="access-time"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.time}
            </Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <MaterialIcons
              name="location-on"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.venue}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.downloadButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={() => handleDownload(item)}
          disabled={downloadingId === item.id}
          activeOpacity={0.8}
        >
          {downloadingId === item.id ? (
            <MaterialIcons name="hourglass-empty" size={18} color="#fff" />
          ) : (
            <MaterialIcons name="download" size={18} color="#fff" />
          )}
          <Text style={styles.downloadButtonText}>
            {downloadingId === item.id ? "Downloading..." : "Download"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.shareButton,
            { borderColor: colors.border },
          ]}
          onPress={() => handleShare(item)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="share" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.uploadInfo}>
        <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
          Uploaded on {formatDate(item.uploadDate)}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Admit Cards
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Download your exam admit cards
        </Text>
      </View>

      {/* Stats Card */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View
            style={[
              styles.statIcon,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <MaterialIcons name="assignment" size={24} color={colors.primary} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {admitCards.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Available Cards
            </Text>
          </View>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View
            style={[
              styles.statIcon,
              { backgroundColor: colors.success + "20" },
            ]}
          >
            <MaterialIcons
              name="check-circle"
              size={24}
              color={colors.success}
            />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {admitCards.filter((card) => card.status === "available").length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Ready to Download
            </Text>
          </View>
        </View>
      </View>

      {/* Admit Cards List */}
      <FlatList
        data={admitCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <AdmitCardItem item={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="assignment"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Admit Cards
            </Text>
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              Your admit cards will appear here when they are uploaded by the
              admin
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  admitCardItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  examTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  examType: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  subject: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  semester: {
    fontSize: 13,
    fontWeight: "400",
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  examDetails: {
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
  },
  downloadButton: {
    flex: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  shareButton: {
    width: 44,
    height: 40,
    borderWidth: 1,
  },
  uploadInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  uploadText: {
    fontSize: 12,
    fontWeight: "400",
  },
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
});

export default AdmitCards;
