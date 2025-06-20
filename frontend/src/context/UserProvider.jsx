import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext";
import Cookies from 'js-cookie';

const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (userData) => {
    if (userData) {
      const expiresAt = new Date().getTime() + 60 * 60 * 1000; // expires in 1 hour
      Cookies.set('user', JSON.stringify({ user: userData, expiresAt }), { expires: 1/24 }); // expires in 1 hour
    } else {
      Cookies.remove('user');
    }
    setUserState(userData);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = Cookies.get('user');
      if (storedUser) {
        const { expiresAt } = JSON.parse(storedUser);
        if (new Date().getTime() > expiresAt) {
          setUser(null);
        }
      }
    }, 1000 * 60); // check every minute

    return () => clearInterval(interval);
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