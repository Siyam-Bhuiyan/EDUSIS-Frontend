import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

// Demo data remains the same
const DEMO_CONVERSATIONS = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Thank you for the clarification about the assignment.",
    timestamp: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "When is the next quiz scheduled?",
    timestamp: "Yesterday",
    unread: 0,
  },
];

const DEMO_MESSAGES = {
  1: [
    {
      id: "1",
      sender: "John Doe",
      text: "Hello professor, I have a question about the recent assignment.",
      timestamp: "10:15 AM",
      isSender: false,
    },
    {
      id: "2",
      sender: "Me",
      text: "Sure, what would you like to know?",
      timestamp: "10:20 AM",
      isSender: true,
    },
    {
      id: "3",
      sender: "John Doe",
      text: "Should we include the implementation details in the documentation?",
      timestamp: "10:25 AM",
      isSender: false,
    },
  ],
};

export default function Messages() {
  const { colors } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const updateLayout = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      // Clean up the event listener
      if (Platform.OS === "web") {
        Dimensions.removeEventListener("change", updateLayout);
      }
    };
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [selectedConversation]);

  const renderConversationItem = (conversation) => (
    <TouchableOpacity
      key={conversation.id}
      style={[
        styles.conversationItem,
        {
          backgroundColor:
            selectedConversation?.id === conversation.id
              ? colors.primary + "15"
              : "transparent",
        },
      ]}
      onPress={() => setSelectedConversation(conversation)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
        {conversation.unread > 0 && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text
            style={[styles.conversationName, { color: colors.text }]}
            numberOfLines={1}
          >
            {conversation.name}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textDim }]}>
            {conversation.timestamp}
          </Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text
            style={[styles.lastMessage, { color: colors.textDim }]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>
          {conversation.unread > 0 && (
            <View
              style={[styles.unreadBadge, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.unreadCount}>{conversation.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = (message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isSender ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {!message.isSender && (
        <Image
          source={{ uri: selectedConversation.avatar }}
          style={styles.messageAvatar}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          message.isSender ? styles.sentBubble : styles.receivedBubble,
          {
            backgroundColor: message.isSender ? colors.primary : colors.card,
            shadowColor: colors.text,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: message.isSender ? "#fff" : colors.text },
          ]}
        >
          {message.text}
        </Text>
      </View>
      <Text
        style={[
          styles.messageTimestamp,
          { color: colors.textDim },
          message.isSender ? styles.sentTimestamp : styles.receivedTimestamp,
        ]}
      >
        {message.timestamp}
      </Text>
    </View>
  );

  const renderChatArea = () => (
    <View style={[styles.chatArea, { backgroundColor: colors.bg }]}>
      {selectedConversation ? (
        <>
          {/* Chat Header */}
          <View
            style={[
              styles.chatHeader,
              {
                backgroundColor: colors.card,
                borderBottomColor: colors.border,
              },
            ]}
          >
            {isMobile && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedConversation(null)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            )}
            <View style={styles.chatHeaderContent}>
              <Image
                source={{ uri: selectedConversation.avatar }}
                style={styles.chatAvatar}
              />
              <View style={styles.chatHeaderText}>
                <Text style={[styles.chatName, { color: colors.text }]}>
                  {selectedConversation.name}
                </Text>
                <Text style={[styles.chatStatus, { color: colors.textDim }]}>
                  Online
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.headerAction} activeOpacity={0.7}>
              <MaterialIcons
                name="more-vert"
                size={24}
                color={colors.textDim}
              />
            </TouchableOpacity>
          </View>

          {/* Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {DEMO_MESSAGES[selectedConversation.id]?.map(renderMessage)}
          </ScrollView>

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.card,
                  borderTopColor: colors.border,
                },
              ]}
            >
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  style={styles.attachButton}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name="attach-file"
                    size={20}
                    color={colors.textDim}
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={newMessage}
                  onChangeText={setNewMessage}
                  placeholder="Type your message..."
                  placeholderTextColor={colors.textDim}
                  multiline
                  maxHeight={100}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor: newMessage.trim()
                        ? colors.primary
                        : colors.textDim + "30",
                    },
                  ]}
                  onPress={() => {
                    if (newMessage.trim()) {
                      console.log("Sending message:", newMessage);
                      setNewMessage("");
                    }
                  }}
                  activeOpacity={0.8}
                  disabled={!newMessage.trim()}
                >
                  <MaterialIcons
                    name="send"
                    size={18}
                    color={newMessage.trim() ? "#fff" : colors.textDim}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <View style={styles.emptyChatArea}>
          <View
            style={[
              styles.emptyStateIcon,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <MaterialIcons
              name="chat-bubble-outline"
              size={48}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.emptyChatTitle, { color: colors.text }]}>
            Welcome to Messages
          </Text>
          <Text style={[styles.emptyChatText, { color: colors.textDim }]}>
            Select a conversation to start messaging with your students
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={colors.isDark ? "light-content" : "dark-content"} />
      {(!isMobile || !selectedConversation) && (
        <View
          style={[
            styles.conversationsList,
            {
              backgroundColor: colors.card,
              borderRightColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.header,
              {
                backgroundColor: colors.card,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.headerLeft}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Messages
              </Text>
              <View
                style={[
                  styles.headerBadge,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.headerBadgeText}>
                  {DEMO_CONVERSATIONS.reduce(
                    (sum, conv) => sum + conv.unread,
                    0
                  )}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <MaterialIcons name="edit" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.conversationsScroll}
            showsVerticalScrollIndicator={false}
          >
            {DEMO_CONVERSATIONS.map(renderConversationItem)}
          </ScrollView>
        </View>
      )}
      {(!isMobile || selectedConversation) && renderChatArea()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  conversationsList: {
    width: Platform.select({
      web: 320,
      default: "100%",
    }),
    maxWidth: "100%",
    borderRightWidth: Platform.select({
      web: 1,
      default: 0,
    }),
  },
  conversationsScroll: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginRight: 8,
  },
  headerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  // Conversation Items
  conversationItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f0f0f0",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4ade80",
    borderWidth: 2,
    borderColor: "#fff",
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "500",
  },
  conversationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  // Chat Area
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  chatHeaderContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  chatHeaderText: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  chatStatus: {
    fontSize: 12,
    fontWeight: "500",
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // Messages
  messagesContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sentMessage: {
    justifyContent: "flex-end",
  },
  receivedMessage: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sentBubble: {
    borderBottomRightRadius: 6,
  },
  receivedBubble: {
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTimestamp: {
    fontSize: 11,
    marginTop: 4,
    paddingHorizontal: 8,
  },
  sentTimestamp: {
    textAlign: "right",
  },
  receivedTimestamp: {
    textAlign: "left",
    marginLeft: 36,
  },

  // Input Area
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
    textAlignVertical: "center",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // Empty State
  emptyChatArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyChatTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyChatText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
