import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

import CheckIns from "./pages/dashboard/CheckInsPage";
import Schedule from "./pages/dashboard/SchedulePage";
import Register from "./pages/dashboard/RegisterPage";
import Statistics from "./pages/dashboard/StatisticsPage";

import Login from "./pages/Login";
import CheckIn from "./componeents/dashboard/CheckIn";
import Member from "./pages/Member";
import NonMember from "./pages/NonMember";
import Seats from "./pages/seats";
import PaymentMade from "./pages/paymentMade";
import GuestDetails from "./pages/guestDetails";
import SaveDetails from "./pages/detailsSaved";
import DashboardLayout from "./componeents/dashboard/dashBoardLayout";

// const override: React.CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    setIsLoggedIn(!!storedUser);
  }, []);
  // const isLoggedIn = true;

  // if (isLoggedIn === null) {
  //   return (
  //     <div>
  //       {" "}
  //       <CircleLoader
  //         // color={color}
  //         // loading={loading}
  //         cssOverride={override}
  //         size={15}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </div>
  //   );
  // }

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/checkIn" element={<CheckIn />} />
            <Route path="/nonMember" element={<NonMember />} />
            <Route path="/isMember" element={<Member />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/paymentMade" element={<PaymentMade />} />
            <Route path="/enterDetails" element={<GuestDetails />} />
            <Route path="/detailSaved" element={<SaveDetails />} />
            <Route path="*" element={<Navigate to="/checkIn" replace />} />
            <Route element={<DashboardLayout />}>
              <Route path="/check-ins" element={<CheckIns />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/register" element={<Register />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>
            <Route path="*" element={<Navigate to="/checkIn" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
