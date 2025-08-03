import { useState, createContext, useContext } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function login(data: any) {
    const res = await loginAdmin(data);
    const user = res.data;
    const userData: User = { name: user.name, email: user.email, id: user.id };
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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split(".")[1]));
  //       const now = Math.floor(Date.now() / 1000);
  //       if (now > payload.exp) {
  //         logout();
  //       } else {
  //         setUser({ name: payload.name, email: payload.email });
  //       }
  //     } catch (error) {
  //       logout();
  //     }
  //   }
  // }, []);

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
