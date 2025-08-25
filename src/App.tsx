import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CheckIns from "./pages/dashboard/CheckInsPage";
import Schedule from "./pages/dashboard/SchedulePage";
import Register from "./pages/dashboard/RegisterPage";
import Statistics from "./pages/dashboard/StatisticsPage";
import { useAuth } from "./context/authContext";
import Login from "./pages/Login";
import CheckIn from "./componeents/dashboard/CheckIn";
import Member from "./pages/Member";
import NonMember from "./pages/NonMember";
import Seats from "./pages/seats";
import PaymentMade from "./pages/paymentMade";
import GuestDetails from "./pages/guestDetails";
import SaveDetails from "./pages/detailsSaved";
import DashboardLayout from "./componeents/dashboard/dashBoardLayout";
import type { JSX } from "react";

export default function App() {
  function PrivateRoute({ children }: { children: JSX.Element }) {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route
          path="/checkIn"
          element={
            <PrivateRoute>
              <CheckIn />
            </PrivateRoute>
          }
        />
        <Route
          path="/nonMember"
          element={
            <PrivateRoute>
              <NonMember />
            </PrivateRoute>
          }
        />
        <Route
          path="/isMember"
          element={
            <PrivateRoute>
              <Member />
            </PrivateRoute>
          }
        />
        <Route
          path="/seats"
          element={
            <PrivateRoute>
              <Seats />
            </PrivateRoute>
          }
        />
        <Route
          path="/paymentMade"
          element={
            <PrivateRoute>
              <PaymentMade />
            </PrivateRoute>
          }
        />
        <Route
          path="/enterDetails"
          element={
            <PrivateRoute>
              <GuestDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/detailSaved"
          element={
            <PrivateRoute>
              <SaveDetails />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/check-ins"
            element={
              <PrivateRoute>
                <CheckIns />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <Schedule />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
