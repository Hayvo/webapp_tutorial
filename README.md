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
6. [Deploying the Flutter Web App and Backend using a CI/CD Pipeline](#deploying-the-flutter-web-app-and-backend-using-a-cicd-pipeline)
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

## **Deploying the Flutter Web App and Backend using a CI/CD pipeline**

This section requires you to have access to a GCP Project with Cloud Run API, Artifact Registry API and Cloud Run API enabled. 

This tutorial is mostly based on the article written by Paulo Schmidt on **medium.com**. You can find the link of the article in the following documentation.

Provided documentation :
  - [GCP setup for a simple web application](https://medium.com/@paulo.a.s/gcp-setup-for-a-simple-web-application-13cd463ba664)
  - [A Complete Guide for GCP: Cloud Build](https://medium.com/@williamwarley/guide-for-gcp-cloud-build-c2ea264a7f97)
  - [Set-up CI/CD using Github Actions and Google Cloud Build](https://medium.com/@_davidanderson/set-up-ci-cd-using-github-actions-and-google-cloud-build-c0c4252e0cbe)
  - [Cloud Build for CICD](https://cgrant.medium.com/cloud-build-for-cicd-c0e05e1a157e)
  - [Deploy to Cloud Run with CI/CD | GCP](https://medium.com/google-cloud/deploy-to-cloud-run-with-ci-cd-gcp-5cde4692217d)
  - [Containerize and Deploy Your First App on Cloud Run](https://medium.com/@yunandarpalilati/containerize-and-deploy-your-first-app-on-cloud-run-ab38c809b291)


First of all, CI/CD stands for Continuous Integration / Continuous Delivery. It means that the deployment of the application is automated and there is no need of manually re-build and re-deploy the entire app at each change. We can automate this process based on a trigger (each commit to the main branch of a Github repository for example).  

Here is the global architecture of the CI/CD pipeline.

![Architecture](https://miro.medium.com/v2/resize:fit:720/format:webp/1*6Sc7o27vzuVm24qiJgdPDg.png)

### **Google Cloud Platform (GCP)**

The entire infrastructure for building and deploying the code, as well as hosting the application, is managed by GCP. Each logical group of resources is contained within a project, so that's the first thing we have to setup in GCP.

1. Access https://console.cloud.google.com/
2. In the main dashboard, click "Create Project" button
3. Give it a name
4. Click "Create" button

Now we can start preparing the resources that we would like GCP to manage for us.

### **Cloud Build**

Cloud Build is the main resource when it comes to continuous integration and delivery (CI/CD) of the application's code, and in my case it does that through the use of triggers, which I'll show you how to setup next. Once a trigger is activated, it goes through the following process:

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*WRb8jPUsPl-NDi2zgYSnBQ.png)

1. Cloud Build pulls the source code from the repository in GitHub. This is possible because at this point I have already connected Cloud Build to GitHub (steps described [here](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers#connect_repo)).

2. A Docker image is created out of the code, based on the Dockerfile stored in the GitHub repository. What happens is that behind the scenes GCP issues a "docker build" command, as we would do if building an image manually..

3. Cloud Build issues the push command from Docker to store the built image to GCP's Artifact Registry.

4. A container is created from the image and the container is deployed to a Cloud Run instance. Cloud Run uses Knative, an open-source serverless platform built on top of Kubernetes, to deploy and manage containers, but that's totally transparent to the user/developer.

The process above is highly customizable, allowing extra steps like running test scripts on the container, deploying to multiple environments (ex.: test, stage, prod), etc. But we'll keep it simple for now. The way I defined the process above was via a cloudbuild.yaml file, stored together with my source code in the GitHub repository, and to be referenced during the setup of the Cloud Build Trigger, which we'll see next. This is how the file looks like:

```yaml
 steps:
 # Build the container image
 - name: 'gcr.io/cloud-builders/docker'
   args: [
    'build', 
    '-t', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA', 
    '-f', './my-app-backend/Dockerfile.prod',
    './my-app-backend']

 # Push the container image to Artifact Registry
 - name: 'gcr.io/cloud-builders/docker'
   args: ['push', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA']
 
 # Deploy container to Cloud Run
 - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
   entrypoint: gcloud
   args: [
   'run', 'deploy', 'my-app-backend',
   '--image', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA',
   '--region', 'us-east1',
   '--allow-unauthenticated']
```

Google's documentation to setup a Cloud Build Trigger can be found [here](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers). One of the options that you have to choose is the configuration type. Select "Cloud Build configuration file (yaml or json)" and reference the location of the file within the GitHub repository:
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Va-J6Kg4p01vNFTfST_LDw.png)

### **Deployment**

For automated deployment and backend/frontend communication I invite you to follow the rest of Paulo Schmidt's tutorial [here](https://medium.com/@paulo.a.s/gcp-setup-for-a-simple-web-application-13cd463ba664).

