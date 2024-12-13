# Full Tutorial: Client-Server Web App Development

This repository provides a comprehensive guide to building a client-server web application from scratch. Learn backend and frontend development, RESTful API design, database integration, authentication, testing, and deployment.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Server](#server)
    - [Folder Structure](#folder-structure)
    - [Folder and File Details](#folder-and-file-details)
    - [Setting Up the Server](#setting-up-the-server)
4. [Client](#client)
5. [Deploying the Flutter Web App and Backend Using Firebase](#deployment)
6. [Deploying the Flutter Web App and Backend Using Cloud Build](#cloudbuild)
---

## **Features**

- Backend setup with a robust structure for scalability.
- RESTful API development to enable client-server communication.
- Frontend development with modern, responsive design.
- Database integration for data storage and retrieval.
- Secure user authentication and authorization.
- Comprehensive testing and debugging strategies.
- Deployment to production-ready environments.

---

## **Prerequisites**

To follow this tutorial, you should have:

- Basic knowledge of Python, JavaScript, and web development.
- Python 3.x installed on your machine.
- A package manager like `pip` for Python and `Flutter` (for frontend setup).
- SQLite (or the database of your choice, if customizing).
- A code editor (e.g., VS Code).

---

## **Server**
The server is responsible for backend logic, managing the database, and providing APIs for the client to interact with. It is a dummy server handling user signup and login using Flask and SQLAlchemy.

### **Folder Structure**

```plaintext
server/
├── requirements.txt    # Required dependencies 
├── app.py              # Main entry point of the server
├── config.py           # Configuration settings (e.g., database URL, secrets)
├── instance/
│   └── database.db     # SQLite database file (auto-generated)
├── models/
│   └── models.py       # Database schema and ORM models
└── routes/
    └── userRoutes.py   # API endpoints for user-related operations
``` 


### **Folder and File Details**

- **`app.py`**  
  The main file to start the server. It initializes the app, loads configurations, and sets up routes.

- **`config.py`**  
  Contains configuration details like the database URI and application settings. Keeps sensitive information separate from the main logic.

- **`instance/`**  
  A directory to store instance-specific data like the SQLite database (`database.db`). This folder is often excluded from version control (e.g., via `.gitignore`).

- **`models/`**  
  Contains `models.py`, which defines the database schema and ORM models using a library like SQLAlchemy.

- **`routes/`**  
  Houses API route definitions. For example, `userRoutes.py` includes user-related endpoints such as login, signup, and profile management.

---

### **Setting Up the Server**

#### **Install Dependencies**  
Ensure you have Python installed, then install the necessary libraries by running:

```bash
pip install -r requirements.txt
```

#### **Run the server**
Use the following command to start the server:

```bash
python app.py
```

#### **Environnement Variables**
Add any necessary environment variables (e.g., API keys, secrets) to config.py or a .env file as needed.

## **Client**

The client is the user-facing application, built using the Flutter framework. It provides a responsive, cross-platform user interface and communicates with the server through API calls.

### **Folder Structure**

```plaintext
client/
├── lib/
│   ├── main.dart          # Entry point of the Flutter application
│   ├── pages/             # Contains UI screens (e.g., login, signup, home)
│   ├── models/            # Data models for app entities
│   ├── services/          # Handles API calls and backend communication
│   ├── providers/         # State management logic using Provider or similar
│   ├── components/        # Reusable UI components
│   └── utils/             # Utility functions or constants
│       └── config.dart    # stores the API base URL and other reusable constants.
├── pubspec.yaml           # Flutter dependencies and assets configuration
├── android/               # Android platform-specific files
├── ios/                   # iOS platform-specific files
├── macos/                 # macOS platform-specific files
├── web/                   # Web platform-specific files
├── windows/               # Windows platform-specific files
├── pubspec.lock           # Lock file for Flutter dependencies
├── analysis_options.yaml  # Linter rules and analysis options
└── test/                  # Unit and widget tests
```

### **Setting Up the Client**

#### **Install Dependencies**  
Ensure Flutter is installed, and then navigate to the `client` directory and run:

```bash
flutter pub get
```

Run the App
Launch the Flutter application using:
```bash
flutter run
```

### **Connect to the Backend**

Update the `API_BASE_URL` in `config.dart` to match the server’s address. For example:

```dart
const String API_BASE_URL = 'http://localhost:5000';  // For local development
```
Or, if you're using a deployed backend, update the URL accordingly:
```dart
const String API_BASE_URL = 'https://your-deployed-backend-url.com';
```

### **Building the app**

To build the release version of the Flutter app, use the following command:

For Android/iOS/web:
```bash
flutter build apk/ios/web
```

## **Deploying the Flutter Web App and Backend using Firebase**

### **1. Install Firebase CLI**

First, install Firebase CLI if you haven't already (this requires npm):

```bash
npm install -g firebase-tools
```
Then log in to your Firebase account:
```bash
firebase login
```

### **2. Build the Flutter Web App if not done already**
Before deploying, ensure you have a production-ready version of your Flutter app.

Build your Flutter Web app.
Navigate to your project directory and run:
```bash
flutter build apk/ios/web
```
This will create the necessary files in the `build/web` directory.

### **3. Initialize Firebase Hosting**

#### **Navigate to Your Flutter Project Directory:**

Make sure you're in the root of your Flutter project, where the `flutter` command is run.

#### **Initialize Firebase Hosting:**

Run the following command:

```bash
firebase init hosting
```
During the setup:
- Choose the Firebase project you created earlier.
- Set build/web as the public directory (this is where the built Flutter web files are located).
- Configure it as a single-page app when prompted ("Yes" to "Configure as a single-page app?").
- Optionally, choose to overwrite index.html or keep your existing one.
  
### **4. Deploy Your Web App to Firebase Hosting**
Once Firebase Hosting is set up and initialized, you can deploy your web app:

```bash
firebase deploy --only hosting
```

This will upload your Flutter web app to Firebase Hosting. Once the process is complete, Firebase will provide a URL where your app is live.

### **5. Access the Deployed App**
Once the deployment finishes, Firebase CLI will show the hosting URL in the terminal. Open that URL in your browser to view your Flutter web app.
Make sure the backend server is running. 

## **Deploying the Flutter Web App and Backend using Cloud Build / Cloud Run**
