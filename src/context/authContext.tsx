import { useState, useEffect, createContext, useContext } from "react";
import loginAdmin from "../../services/apis/login";

type User = {
  name: string;
  email: string;
  id: string;
};
type Logindetails = {
  email: string;
  password: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (payload: Logindetails) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("access_token");
  });
  const [user, setUser] = useState<User | null>(null);

  async function login(data: Logindetails) {
    const res = await loginAdmin(data);
    const user = res.data;
    const userData: User = { name: user.name, email: user.email, id: user.id };

    localStorage.setItem("admin_name", user.name);
    localStorage.setItem("admin_email", user.email);
    localStorage.setItem("admin_id", user.id);
    localStorage.setItem("access_token", user.tokens.access_token);
    localStorage.setItem("refresh_token", user.tokens.refresh_token);

    setUser(userData);
    setIsLoggedIn(true);
    return res;
  }

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("admin_name");
    const email = localStorage.getItem("admin_email"); // save this on login
    const id = localStorage.getItem("admin_id"); // save this on login

    if (token && name && email && id) {
      setIsLoggedIn(true);
      setUser({ name, email, id });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside the authProvider");
  } else return context;
};
