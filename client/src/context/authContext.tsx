import { createContext, useState } from 'react';
import { ExtendedPurchase } from 'src/types/purchase.type';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getUserFromLs } from 'src/utils/getTokenfromLS';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchases: ExtendedPurchase[];
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>;
  reset: () => void;
};

const initialValue = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getUserFromLs(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
};

export const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({
  children,
  defaultValue = initialValue
}: {
  children: React.ReactNode;
  defaultValue?: AuthContextType;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(initialValue.profile);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchases([]);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
