import { useUser } from "../context/UserContext";
import ApiProvider from "../providers/ApiProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
const Home = () => {
    const { user, setUser } = useUser();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        console.log("No valid user session. Redirecting to login...");
        navigate("/login");
      } else {
        console.log("Valid user session found. :", user);
      }
    }, [user, navigate]);

    const apiProvider = useMemo(() => {
        return user ? new ApiProvider({ accessToken: user.access_token }) : null;
    }, [user]);

    useEffect(() => {
        if (!apiProvider) return;

        const fetchUsers = async () => {
        try {
            const _users = await apiProvider.getUsers(); // user from context
            console.log("Fetched users:", _users);
            setUsers(_users);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setError(error.message);
        }
        }

        fetchUsers();
    }, [apiProvider]);

  const increaseUserCounter = async (_user) => {
      try {
        await apiProvider.increaseUserCounter(_user);
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === _user.id ? { ...user, click_counter: user.click_counter + 1 } : user)));
        } catch (error) {
        console.error("Failed to increase user counter:", error);
        setError(error.message);
      }
    };

  return (
    <div className="h-screen w-screen bg-lightTheme-background flex  flex-col items-center justify-center p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setUser(null); // this will clear cookie and state via your context logic
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-lightTheme-border p-8">
        <h1 className="text-2xl font-bold text-center text-lightTheme-logo mb-8">
          All users
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((_user) => (
            <li
              key={_user.id}
              className="flex flex-col items-center bg-lightTheme-cardBackground border border-lightTheme-border rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={_user.profile_picture}
                alt={_user.first_name}
                className="w-20 h-20 rounded-full object-cover border border-lightTheme-border shadow-sm mb-4"
              />
              <h2 className="text-lg font-semibold text-lightTheme-textPrimary text-center">
                {_user.first_name} {_user.last_name}
              </h2>
              <p className="text-sm text-lightTheme-textSecondary mb-4">
                {_user.click_counter} clicks
              </p>

              <button
                onClick={() => increaseUserCounter(_user)}
                className="bg-lightTheme-CTA text-white font-medium py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center gap-2"
              >
                <span className="text-lg">+</span> Increase counter
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home
