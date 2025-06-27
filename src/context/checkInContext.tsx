// function memberContext() {
//   let isMember = false;

//   function setIsMember(newValue: null | boolean = null) {
//     if (newValue == null) return isMember;
//     isMember = newValue;
//     return isMember;
//   }

//   return setIsMember;
// }

// export default memberContext();

import { useState, createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
  isMember: boolean;
};

type CheckInType = {
  user: User | null;
  checkin: (token: string) => void;
};

const CheckInContext = createContext<CheckInType | undefined>(undefined);

export function CheckInProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const checkin = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({
      name: payload.name,
      email: payload.email,
      isMember: payload.isMember,
    });
  };
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
