import { createContext } from "react";

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  authToken?: string;
}

export interface UserContext {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const defaultUserContext: UserContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContext>(defaultUserContext);
