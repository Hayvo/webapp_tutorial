# Vite + TailwindCSS Project Setup Tutorial

This tutorial will guide you through setting up a Vite project with TailwindCSS from scratch. We'll cover the initial setup, explain the folder structure, and show you how to create a `.env` file based on a template.

## Step 1: Initialize a Vite Project

First, ensure you have Node.js installed on your machine. Then, create a new Vite project:

```bash
npm create vite@latest my-vite-app -- --template react
cd my-vite-app
```

## Step 2: Install TailwindCSS

Navigate to your project directory and install TailwindCSS along with its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 3: Configure TailwindCSS

Edit the `tailwind.config.js` file to specify the paths to your template files:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Step 4: Setup CSS

In your `src` directory, create a `index.css` file and include the Tailwind directives:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensure to import this CSS file in your `src/main.jsx`:

```javascript
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import Tailwind CSS
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Step 5: Folder Structure

Here's an overview of the folder structure:

```plaintext
frontend/
├── public/                  # Public assets
├── src/                     # Source files
│   ├── assets/              # Assets files
│   ├── context/             # Context files
│   ├── pages/               # Page components
│   ├── providers            # API Providers
│   ├── index.css            # TailwindCSS imports
│   ├── main.jsx             # Application entry point
│   └── index.css            # CSS File
├── .gitignore               # Git ignore file
├── index.html               # Main HTML file
├── package.json             # Project configuration and dependencies
├── tailwind.config.js       # TailwindCSS configuration
└── vite.config.js           # Vite configuration
```

## Step 6: Create a .env File

Create a `.env` file in the root of your project to manage environment variables. Refer to the `.env.template` structure:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_API_URL=http://localhost:5000
```

Make sure to replace `YOUR_GOOGLE_CLIENT_ID` and other placeholder values with your actual configuration values. To create a Google Client ID visit the Credentials page on your GCP project. Here is a [complete tutorial](https://dev.to/pikkue/create-google-login-credentials-for-your-web-application-3dc2).

## Conclusion

You now have a basic Vite + TailwindCSS project setup. You can start the development server with:

```bash
npm run dev
```

Visit `http://localhost:5173` to see your project in action.
