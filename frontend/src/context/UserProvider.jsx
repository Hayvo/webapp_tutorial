import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import UserContext from "./UserContext";

const COOKIE_NAME = "user";
const COOKIE_EXPIRE_HOURS = 1;

const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    try {
      const cookieValue = Cookies.get(COOKIE_NAME);
      return cookieValue ? JSON.parse(cookieValue) : null;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
      return null;
    }
  });

  const setUser = (userData) => {
    if (userData) {
      Cookies.set(COOKIE_NAME, JSON.stringify(userData), {
        expires: COOKIE_EXPIRE_HOURS / 24, // Convert hours to days
        sameSite: "Lax",
      });
    } else {
      Cookies.remove(COOKIE_NAME);
    }
    setUserState(userData);
  };

  // Optional: auto-expiry logic (in case client clock or tab is open >1hr)
  useEffect(() => {
    const checkExpiry = setInterval(() => {
      const cookieValue = Cookies.get(COOKIE_NAME);
      if (!cookieValue) return;

      try {
        const storedUser = JSON.parse(cookieValue);
        // Optional: implement time-based expiration check here if needed
        // e.g., setUser(null) if you manually store expiresAt
      } catch {
        Cookies.remove(COOKIE_NAME);
        setUserState(null);
      }
    }, 1000 * 60); // every minute

    return () => clearInterval(checkExpiry);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
