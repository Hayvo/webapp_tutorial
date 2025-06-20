import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";

const isDev = process.env.NODE_ENV !== "production";
const backendUrl = isDev
  ? "http://localhost:5000" // Local backend
  : ""; // Production backend URL can be set here if needed

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // This is the default, but ensure it's specified.
  },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    cors: {
      origin: backendUrl, // Flask backend URL
      credentials: true, // Allow cookies and JWTs
    },
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(backendUrl), // Expose API URL
    "import.meta.env.VITE_GOOGLE_CLIENT_ID": JSON.stringify(dotenv.config().parsed.VITE_GOOGLE_CLIENT_ID || ""
    ), // Expose Google Client ID
  },
});