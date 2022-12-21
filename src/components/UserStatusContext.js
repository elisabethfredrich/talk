import { createContext } from "react";

export const UserStatusContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});
