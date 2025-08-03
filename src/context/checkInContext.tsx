import { useState, createContext, useContext } from "react";
import { checkIfUserExists } from "../../services/apis/member";

type User = {
  msg: string;
  name: string;
  email: string;
  isMember: boolean;
};

type CheckInType = {
  user: User | null;
  checkin: (data: { email: string }) => Promise<any>;
};

const CheckInContext = createContext<CheckInType | undefined>(undefined);

export function CheckInProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function checkin(data: any) {
    const res = await checkIfUserExists(data);
    console.log(res);
    if (res.status == true) {
      const payload = res.data;
      console.log(payload.is_member);
      setUser({
        msg: res.msg,
        name: payload.name,
        email: payload.email,
        isMember: payload.is_member,
      });
    }
    return res;
  }
  return (
    <CheckInContext.Provider value={{ user, checkin }}>
      {children}
    </CheckInContext.Provider>
  );
}

export function useCheckInAuth() {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error("usecheckinauth must be used inside the provider");
  } else return context;
}
