import { useState, createContext, useEffect, useContext } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
let externalLogout: (() => void) | null = null; //to allow logout function to be accessed outside react component

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userData = { name: payload.name, email: payload.email };
      localStorage.setItem("token", token);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  externalLogout = logout;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        if (now > payload.exp) {
          logout();
        } else {
          setUser({ name: payload.name, email: payload.email });
        }
      } catch (error) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const getAuthLogout = () => externalLogout;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside the authProvider");
  } else return context;
};
