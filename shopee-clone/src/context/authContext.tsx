import { createContext, useState } from 'react';
import { getAccessTokenFromLS } from 'src/utils/getTokenfromLS';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};
