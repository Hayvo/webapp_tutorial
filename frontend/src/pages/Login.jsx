import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/LogoDGC.png"; // Adjust the path as necessary

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      console.log("User session found. Redirecting to shop selection...");
      navigate("/home");
    } else {
        console.log("No user session found. Please log in.");
        // Optionally, you can redirect to a different page or show a message
    }
  }, [user, navigate]);

  const login = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user }),
      });

      if (!response.ok)
        throw new Error((await response.json()).message || "Login failed");

      const data = await response.json();

      console.log("Login successful:", data);
      setUser(data.user);
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log("Google Client ID:", clientId);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center w-screen h-screen bg-lightTheme-background">
        <div className="bg-lightTheme-cardBackground border border-lightTheme-border shadow-md rounded-2xl p-8 w-96 text-center flex flex-col items-center gap-6">
          <img
            src={logo}
            alt="DataGem Consulting Logo"
            className="w-50"
          />
          <h1 className="text-xl font-bold text-lightTheme-textPrimary font-montserrat">
            Welcome to the Web App tutorial <br /> by <span className="text-lightTheme-logo"> DataGem Consulting </span>
          </h1>
          <p className="text-lightTheme-textSecondary font-montserrat text-sm">
            Sign in to continue
          </p>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (!credentialResponse.credential) {
                setError("No credential received");
                return;
              }
              login(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
              setError("Login failed. Please try again.");
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
