import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';

// Demo data remains the same
const DEMO_CONVERSATIONS = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Thank you for the clarification about the assignment.',
    timestamp: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'When is the next quiz scheduled?',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'I have submitted my project report.',
    timestamp: 'Yesterday',
    unread: 1,
  },
];

const DEMO_MESSAGES = {
  '1': [
    {
      id: '1',
      sender: 'John Doe',
      text: 'Hello professor, I have a question about the recent assignment.',
      timestamp: '10:15 AM',
      isSender: false,
    },
    {
      id: '2',
      sender: 'Me',
      text: 'Sure, what would you like to know?',
      timestamp: '10:20 AM',
      isSender: true,
    },
    {
      id: '3',
      sender: 'John Doe',
      text: 'Should we include the implementation details in the documentation?',
      timestamp: '10:25 AM',
      isSender: false,
    },
    {
      id: '4',
      sender: 'Me',
      text: 'Yes, please include a detailed explanation of your implementation approach.',
      timestamp: '10:28 AM',
      isSender: true,
    },
    {
      id: '5',
      sender: 'John Doe',
      text: 'Thank you for the clarification about the assignment.',
      timestamp: '10:30 AM',
      isSender: false,
    },
  ],
};

export default function Messages() {
  const { colors } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const updateLayout = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      // Clean up the event listener
      if (Platform.OS === 'web') {
        Dimensions.removeEventListener('change', updateLayout);
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
          backgroundColor: selectedConversation?.id === conversation.id 
            ? colors.primary + '20'
            : colors.cardBg,
        },
      ]}
      onPress={() => setSelectedConversation(conversation)}
    >
      <Image
        source={{ uri: conversation.avatar }}
        style={styles.avatar}
      />
      <View style={styles.conversationInfo}>
        <Text style={[styles.conversationName, { color: colors.text }]}>
          {conversation.name}
        </Text>
        <Text 
          style={[styles.lastMessage, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      <View style={styles.conversationMeta}>
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
          {conversation.timestamp}
        </Text>
        {conversation.unread > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.unreadCount}>{conversation.unread}</Text>
          </View>
        )}
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
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: message.isSender ? colors.primary : colors.cardBg,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: message.isSender ? '#fff' : colors.text },
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.messageTimestamp,
            { color: message.isSender ? '#fff' : colors.textSecondary },
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderChatArea = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.chatArea, { backgroundColor: colors.bg }]}>
      {selectedConversation ? (
        <>
          <View style={[styles.chatHeader, { backgroundColor: colors.cardBg }]}>
            {isMobile && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setSelectedConversation(null)}
              >
                <MaterialIcons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            )}
            <Image
              source={{ uri: selectedConversation.avatar }}
              style={styles.chatAvatar}
            />
            <Text style={[styles.chatName, { color: colors.text }]}>
              {selectedConversation.name}
            </Text>
          </View>

          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {DEMO_MESSAGES[selectedConversation.id]?.map(renderMessage)}
          </ScrollView>

          <View style={[styles.inputContainer, { backgroundColor: colors.cardBg }]}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.bg,
                color: colors.text,
                borderColor: colors.border,
              }]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              multiline
              maxHeight={100}
            />
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                if (newMessage.trim()) {
                  console.log('Sending message:', newMessage);
                  setNewMessage('');
                }
              }}
            >
              <MaterialIcons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyChatArea}>
          <MaterialIcons 
            name="chat-bubble-outline" 
            size={48} 
            color={colors.textSecondary} 
          />
          <Text style={[styles.emptyChatText, { color: colors.textSecondary }]}>
            Select a conversation to start messaging
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {(!isMobile || !selectedConversation) && (
        <View style={[styles.conversationsList, { borderColor: colors.border }]}>
          <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="edit" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.conversationsScroll}>
            {DEMO_CONVERSATIONS.map(renderConversationItem)}
          </ScrollView>
        </View>
      )}
      {(!isMobile || selectedConversation) && renderChatArea()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  conversationsList: {
    width: Platform.select({
      web: '300px',
      default: '100%',
    }),
    maxWidth: '100%',
    borderRightWidth: Platform.select({
      web: 1,
      default: 0,
    }),
  },
  conversationsScroll: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 8,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
  },
  conversationMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    marginBottom: 4,
  },
  unreadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 72,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChatArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChatText: {
    marginTop: 16,
    fontSize: 16,
  },
});