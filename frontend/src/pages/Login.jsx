import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/LogoDGC.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const API_URL = import.meta.env.VITE_API_URL;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (user) {
      console.log("✅ User session found. Redirecting to /home...");
      navigate("/home");
    } else {
      console.log("ℹ️ No user session found.");
    }
  }, [user, navigate]);

  const handleLogin = async (googleToken) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // to receive cookies
        body: JSON.stringify({ id_token: googleToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const { user: userData } = await response.json();
      console.log("✅ Login successful:", userData);

      setUser(userData);
      navigate("/home");

    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.message || "An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center w-screen h-screen bg-lightTheme-background">
        <div className="bg-lightTheme-cardBackground border border-lightTheme-border shadow-md rounded-2xl p-8 w-96 text-center flex flex-col items-center gap-6">
          <img
            src={logo}
            alt="DataGem Consulting Logo"
            className="w-40 h-auto"
          />

          <h1 className="text-xl font-bold text-lightTheme-textPrimary font-montserrat">
            Welcome to the Web App tutorial<br />
            by <span className="text-lightTheme-logo">DataGem Consulting</span>
          </h1>

          <p className="text-lightTheme-textSecondary font-montserrat text-sm">
            Sign in to continue
          </p>

          <GoogleLogin
            onSuccess={({ credential }) => {
              if (!credential) {
                setError("No Google credential received");
                return;
              }
              handleLogin(credential);
            }}
            onError={() => {
              console.error("Google Login failed");
              setError("Google login failed. Please try again.");
            }}
          />

          {loading && (
            <p className="text-lightTheme-textSecondary font-montserrat">
              Logging in...
            </p>
          )}

          {error && (
            <p className="text-lightTheme-errorRed font-montserrat text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
