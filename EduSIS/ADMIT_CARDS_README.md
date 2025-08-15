# Admit Card Management System

## Overview

The Admit Card Management System allows admins to upload student admit cards and enables students to download their exam admit cards from their dashboard.

## Features

### Admin Side (`components/admin/AdmitCards.jsx`)

- **Upload Admit Cards**: Admins can select students and upload PDF admit cards
- **Student Search**: Search functionality to find specific students
- **File Management**: Support for PDF file uploads using document picker
- **Card Management**: View all uploaded admit cards with details
- **Delete Functionality**: Remove admit cards when needed

### Student Side (`components/student/AdmitCards.jsx`)

- **Download Admit Cards**: Students can download their available admit cards
- **Exam Details**: View exam information including date, time, and venue
- **File Sharing**: Share admit cards with others
- **Status Tracking**: See upload dates and availability status

## How to Use

### For Admins:

1. Navigate to Admin Dashboard → Admit Cards
2. Click "Upload Admit Card" button
3. Search and select a student
4. Choose a PDF file from device
5. Click "Upload Admit Card" to save

### For Students:

1. Navigate to Student Dashboard → Admit Cards (or click Quick Action)
2. View available admit cards with exam details
3. Click "Download" to save the admit card locally
4. Use share button to share the admit card

## Navigation Integration

### Admin Navigation:

- Added to `AdminNavigator.jsx` as a drawer screen
- Added to admin dashboard quick actions
- Added to sidebar quick actions

### Student Navigation:

- Added to `StudentNavigator.jsx` as a drawer screen
- Added to student dashboard quick actions
- Added to sidebar quick actions

## Dependencies

- `expo-document-picker`: For selecting PDF files
- `expo-file-system`: For file operations
- `expo-sharing`: For sharing downloaded files

## UI/UX Features

- **Modern Design**: Clean, beautiful interface with consistent styling
- **Stats Cards**: Display counts of available cards and students
- **Animated Components**: Smooth animations using react-native-reanimated
- **Theme Support**: Fully integrated with the app's theme system
- **Mobile Optimized**: Proper touch targets and mobile-friendly interactions
- **Empty States**: Helpful messages when no cards are available

## File Structure

```
components/
├── admin/
│   └── AdmitCards.jsx          # Admin admit card management
└── student/
    └── AdmitCards.jsx          # Student admit card download

navigation/
├── admin/
│   └── AdminNavigator.jsx      # Updated with admit cards route
└── student/
    └── StudentNavigator.jsx    # Updated with admit cards route
```

## Future Enhancements

- Real backend integration for file storage
- Push notifications when new admit cards are uploaded
- Bulk upload functionality for admins
- Admit card templates and generation
- PDF preview functionality
- Advanced filtering and sorting options
