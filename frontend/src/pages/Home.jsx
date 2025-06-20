import { useUser } from "../context/UserContext";
import ApiProvider from "../providers/ApiProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useState } from "react";
const Home = () => {
    const { user, _ } = useUser();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        console.log("No valid user session. Redirecting to login...");
        navigate("/login");
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
    <div className="flex items-center justify-center w-screen h-screen bg-lightTheme-background">
        <div className="bg-lightTheme-cardBackground border border-lightTheme-border shadow-md rounded-2xl p-8 w-96 text-center flex flex-col items-center gap-6">
          <h1 className="text-xl font-bold text-lightTheme-logo">
            All users
          </h1>
          <div className="flex flex-col items-center gap-4 border-lightTheme-borderDark bg-lightTheme-backgroundSecondary p-4 rounded-2xl w-full">
            {users.map((_user) => (
              <button
                key={_user.id}
                className="bg-lightTheme-cardBackground border border-lightTheme-border shadow-md rounded-2xl p-4 w-64 text-left"
                onClick={() => increaseUserCounter(_user)}
              >
                <img src={_user.profile_picture} alt={_user.first_name} className="w-12 h-12 mb-2" />
                {_user.first_name} {_user.last_name} {_user.click_counter}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )}
        </div>
      </div>
  )
}

export default Home
