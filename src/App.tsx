import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import CheckIns from "./pages/dashboard/CheckInsPage";
import Schedule from "./pages/dashboard/SchedulePage";
import Register from "./pages/dashboard/RegisterPage";
import Statistics from "./pages/dashboard/StatisticsPage";
import { useAuth } from "./context/authContext";
import Login from "./pages/Login";

import Member from "./pages/Member";
import NonMember from "./pages/NonMember";
import Seats from "./pages/seats";
import PaymentMade from "./pages/paymentMade";
import SaveDetails from "./pages/detailsSaved";
import GuestDetails from "./pages/guestDetails";
import DashboardLayout from "./componeents/dashboard/dashBoardLayout";

export type availablePlan = {
  expires_at: Date;
  seat_id: string;
};
export default function App() {
  const { isLoggedIn } = useAuth();
  const [email, set_email] = useState("");
  const [available_plan, set_available_plan] = useState<availablePlan[] | []>(
    []
  );

  const time_expired = (time: Date) => {
    return time.getTime() < Date.now();
  };

  const available_plan_handler = (plan: availablePlan[]) => {
    set_available_plan(plan);
  };

  const email_handler = (email: string) => {
    set_email(email);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes (always available) */}
        <Route path="/login" element={<Login />} />
        {/* Redirect root ("/") depending on auth */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        isDisabled
        {isLoggedIn && (
          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                time_expired={time_expired}
                checked_in_email={email}
                available_plan={available_plan}
              />
            }
          >
            {/* Default page under /dashboard */}
            <Route index element={<Navigate to="check-ins" replace />} />

            <Route
              path="check-ins"
              element={<CheckIns email={email} email_handler={email_handler} />}
            />
            <Route path="statistics" element={<Statistics />} />
            <Route path="register" element={<Register />} />
            <Route path="schedule" element={<Schedule />} />

            <Route
              path="nonMember"
              element={
                <NonMember
                  email={email}
                  email_handler={email_handler}
                  available_plan_handler={available_plan_handler}
                />
              }
            />
            <Route
              path="isMember"
              element={<Member email={email} email_handler={email_handler} />}
            />
            <Route path="seats" element={<Seats />} />
            <Route
              path="enterDetails"
              element={<GuestDetails checked_in_email={email} />}
            />
            <Route
              path="paymentMade"
              element={
                <PaymentMade email={email} email_handler={email_handler} />
              }
            />
            <Route
              path="detailSaved"
              element={<SaveDetails checked_in_email={email} />}
            />
            <Route path="*" element={<Navigate to="check-ins" replace />} />
          </Route>
        )}
        {/* Fallback: if no route matches */}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
