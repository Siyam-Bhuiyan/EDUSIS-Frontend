# EDUSIS - Educational System Information Solution

<div align="center">

![EDUSIS Logo](./assets/logo.png)

A comprehensive university management system designed to streamline academic and administrative processes.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

## 🎯 Overview

EDUSIS is an all-in-one educational management platform that unifies various academic and administrative processes into a single, cohesive system. Unlike traditional solutions that require multiple applications, EDUSIS provides a seamless experience for administrators, teachers, and students.

## ✨ Features

### 👨‍💼 Admin Features
- Student/Faculty Management
- Department and Course Creation
- Teacher Assignment
- Student Enrollment
- System Oversight

### 👨‍🏫 Teacher Features
- Announcements
- Online Classes
- File and Assignment Upload
- Grading
- Calendar Management

### 👨‍🎓 Student Features
- Course Management
- Announcements
- Assignment Submission
- Group Chats
- Results Viewing
- Online Classes
- Calendar Access

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Siyam-Bhuiyan/EDUSIS-Frontend.git
```

2. Navigate to the project directory:
```bash
cd EDUSIS-Frontend/EduSIS
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## 💻 Usage

After starting the development server:

1. Use the Expo Go app on your mobile device to scan the QR code
2. Or press 'a' to open in Android emulator
3. Or press 'i' to open in iOS simulator (macOS only)

## 📁 Project Structure

```
EDUSIS/
├── assets/              # Static assets
├── components/          # Reusable components
│   ├── admin/          # Admin-specific components
│   ├── teacher/        # Teacher-specific components
│   ├── student/        # Student-specific components
│   └── layout/         # Layout components
├── navigation/         # Navigation configuration
├── theme/              # Theme configuration
└── App.js              # Application entry point
```

## 🛠 Tech Stack

- **Framework:** React Native with Expo
- **UI Components:** Custom components with Material Design
- **Navigation:** React Navigation
- **State Management:** React Context API
- **Theme:** Custom theme provider with dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---