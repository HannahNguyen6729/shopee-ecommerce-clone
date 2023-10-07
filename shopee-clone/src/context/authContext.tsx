import { createContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getUserFromLs } from 'src/utils/getTokenfromLS';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
};

const initialValue = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getUserFromLs(),
  setProfile: () => null
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(initialValue.profile);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
