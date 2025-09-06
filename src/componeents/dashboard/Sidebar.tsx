import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { ChartNoAxesCombined, CalendarCheck2, CircleUser } from "lucide-react";

const Sidebar = ({ checked_in_email }: { checked_in_email: string }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [login_out, set_login_out] = useState(false);
  const admin_name = localStorage.getItem("admin_name");
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname == path;

  // Animation variants for mobile
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 0.5, display: "block" },
    closed: { opacity: 0, transitionEnd: { display: "none" } },
  };

  // Shared sidebar content
  const sidebarContent = (
    <>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <CircleUser size={45} className="text-gray-700" />
          </div>
          <div className="ml-4">
            <div className="font-bold text-black">ADMIN</div>
            <div className="text-sm">{admin_name}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <Link to="/check-ins" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            className={`flex items-center px-6 py-3 ${
              isActive("/check-ins") ? "font-bold bg-red-300" : ""
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/chair.png" className="mr-4 w-6" alt="Check In's" />
            <span>Check In's</span>
          </motion.div>
        </Link>

        <Link to="statistics" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            className={`flex items-center px-6 py-3 ${
              isActive("statistics") ? "font-bold bg-gray-100" : ""
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChartNoAxesCombined className="mr-4" size={20} />
            <span>Statistics</span>
          </motion.div>
        </Link>

        <Link to="register" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            className={`flex items-center px-6 py-3 ${
              isActive("register") ? "font-bold bg-gray-100" : ""
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUserPlus className="mr-4" size={20} />
            <span>Register</span>
          </motion.div>
        </Link>

        <Link to="schedule" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            className={`flex items-center px-6 py-3 ${
              isActive("schedule") ? "font-bold bg-gray-100" : ""
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <CalendarCheck2 className="mr-4" size={20} />
            <span>Schedule</span>
          </motion.div>
        </Link>

        <Link
          to={checked_in_email == "" ? "#" : "seats"}
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          <motion.div
            className={`flex items-center px-6 py-3 ${
              isActive("seats") ? "font-bold bg-gray-100" : ""
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/chair.png" className="mr-4 w-6" alt="Seats" />
            <span>Seats</span>
          </motion.div>
        </Link>

        <Link
          to={checked_in_email == "" ? "#" : "enterDetails"} // fallback to "#" or undefined if disabled
          onClick={(e) => {
            if (checked_in_email == "") {
              e.preventDefault(); // stop navigation
              return;
            }
            setIsMobileMenuOpen(false);
          }}
          className={`flex items-center px-6 py-3 ${
            isActive("enterDetails") ? "font-bold bg-gray-100" : ""
          } ${
            checked_in_email == ""
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : ""
          }`}
        >
          <motion.div
            whileHover={checked_in_email == "" ? {} : { x: 5 }}
            whileTap={checked_in_email == "" ? {} : { scale: 0.98 }}
            className="flex items-center"
          >
            <img src="/chair.png" className="mr-4 w-6" alt="Check In's" />
            <span>Non-member details</span>
          </motion.div>
        </Link>

        <div className="relative p-6 md:mt-32 mt-48">
          <button
            className={`w-[85px] h-[35px] text-center p-[10px] mb-[20px] mt-[39px] lg:w-[176px] lg:h-[60px] bg-[#FFDD00] lg:mt-[29px] cursor-pointer ${
              login_out && "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              set_login_out(true);
              setTimeout(logout, 2000);
            }}
          >
            Log Out
          </button>
          <FaArrowLeft className="absolute left-2 mr-4" size={16} />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed bg-white rounded-xl shadow-2xl rounded-l-none top-7 md:top-6 right-5 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md focus:outline-none "
        >
          {isMobileMenuOpen ? (
            <FaTimes size={20} className="text-gray-700" />
          ) : (
            <FaBars size={20} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black z-30 t0p lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar (animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 h-screen flex flex-col pt-24 fixed bg-white shadow-lg z-40 right-0 lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar (always visible) */}
      <div className="hidden lg:flex w-72 h-screen flex-col fixed bg-white shadow-lg z-40 left-0 border-r border-gray-200">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
