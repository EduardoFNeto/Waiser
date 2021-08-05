import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({} as any);

const { Provider } = UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <Provider value={[user, setUser]}>{children}</Provider>;
};
