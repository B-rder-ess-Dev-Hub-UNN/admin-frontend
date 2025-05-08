import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './componeents/dashboard/Header';
import CheckIns from './pages/dashboard/CheckInsPage';
import Schedule from './pages/dashboard/SchedulePage';
import Register from './pages/dashboard/RegisterPage';
import Statistics from './pages/dashboard/StatisticsPage';
import Sidebar from './componeents/dashboard/Sidebar';

function App() {
  return (
    <Router>
     
      <Header />
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
       
        <Sidebar />
        <div className="flex-1 overflow-auto lg:ml-72  lg:mt-0 md:py-4 px-4">
          <Routes>
            <Route path="/check-ins" element={<CheckIns />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/register" element={<Register />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<Navigate to="/check-ins" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;