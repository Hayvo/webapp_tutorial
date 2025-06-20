import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);
export default UserContext;
