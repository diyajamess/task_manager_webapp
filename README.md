# Task Manager with React & Material-UI

## 🌟 Description
This project is a **simple Task Manager web app** built using **React** and **Material-UI**. It allows users to **manage their tasks** with features such as **creating tasks**, **viewing upcoming tasks**, and **customizing user profiles**. The app also supports **light and dark themes** and includes a **user-friendly interface** with **avatar management**.

---

## ⚙️ Key Features

### 📝 **Task Management**:
- **Add Tasks**: Easily add new tasks with a simple form.
- **Upcoming Tasks**: View the list of upcoming tasks to stay organized and on top of your responsibilities.

### 👤 **Profile Management**:
- **Change Avatar**: Upload and customize your avatar image.
- **Edit Profile**: Update your name and email in your profile settings.

### 🌗 **Light/Dark Theme**:
- The app supports both **light** and **dark modes**, giving users control over the UI's appearance.

### 📱 **Responsive Design**:
- The app is fully **mobile-friendly** and adapts seamlessly to different screen sizes, ensuring a great experience on any device.

---

## 🛠️ Technologies Used
- **React**: A JavaScript library for building interactive user interfaces, making your tasks more dynamic.
- **Material-UI (MUI)**: A React component library implementing Google's **Material Design** for a sleek and responsive UI.
- **CSS Baseline**: A component from Material-UI that normalizes styles across browsers for consistent UI rendering.
- **ThemeProvider**: Manage and apply global styles, like light and dark themes, across the app.
- **Avatar & Icon Buttons**: MUI components used to display user avatars and settings options.
- **React's useState**: For managing component states such as selected tabs, loading states, and user profile data.

---

## 💡 Code Explanation

### 1. **AppBar (Navigation Bar)**:
- Uses **Material-UI's AppBar** for a sleek header, including:
  - **Logo** (AdbIcon)
  - **Theme Toggle** (Brightness4Icon and Brightness7Icon)
  - **Profile Menu** (User Avatar & Settings)

### 2. **Theme Toggle**:
- The app includes a **light/dark theme toggle**. Click to switch between light and dark modes, dynamically updating the UI with **createTheme** from MUI.

### 3. **Tabs for Navigation**:
- The app uses **Material-UI Tabs** for easy navigation between sections:
  - **"Add-a-Doo"** for task creation
  - **"To-Do Peek"** for upcoming tasks
  - **Welcome tab** for greeting and task management

### 4. **Profile Menu**:
- **Profile Settings**: Users can update their avatar, name, and email.
  - **Avatar Upload**: Users can upload an image file, which is immediately previewed.

### 5. **Loading State**:
- When a task or profile change is being processed, the **CircularProgress** spinner shows that the app is working in the background.

### 6. **Responsive Design**:
- The app uses **Material-UI** components combined with **custom sx styling** to ensure responsiveness. The navigation bar is hidden on smaller screens, and a profile icon opens the settings menu.

---

## 🔍 Code Breakdown

### **App Component (App.js)**:
- **State Management**:
  - `tabValue`: Tracks the selected tab for correct content rendering.
  - `themeMode`: Manages the light/dark theme state.
  - `anchorElUser`: Controls the visibility of the profile menu.
  - `loading`: Indicates when the app is processing actions like saving the profile.

- **Components Used**:
  - **Tabs**: Navigation through different sections (task creation, task list).
  - **Avatar, IconButton, Tooltip, Menu, MenuItem**: Avatar and settings options dropdown.
  - **CircularProgress**: Displays a loading spinner for async processes.

### **Profile Page**:
- Users can upload a new avatar and update profile details.
  - **Preview**: The uploaded image is shown immediately using `createObjectURL`.
  - **Simulated Loading**: A loading spinner appears while saving changes.

---

## 🚀 How to Use

### 1. **Clone the Repository**:
```bash

git clone https://github.com/yourusername/task-manager-app.git

### 1. **Clone the Repository**:

```

### 2. **Install Dependencies**:
- Navigate to the project folder and install the required dependencies:

```bash
Copy code
cd task-manager-app
npm install
```

### 3. **Start the Development Server**:
- Run the following command to start the app locally:

```bash
Copy code
npm start
```
This will start the app at http://localhost:3000.

### 🤝 Contributing
Want to contribute? Awesome! Fork the repository, create a new branch, and submit a pull request. Please follow the code style and write tests for any new features or bug fixes.

### ✨ Feel free to adjust this template to better reflect your app's features and any updates or changes!

