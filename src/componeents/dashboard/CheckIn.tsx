import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChartNoAxesCombined, CalendarCheck2 } from "lucide-react";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { useCheckInAuth } from "../../context/checkInContext";

export default function CheckIn({ children }: { children?: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuStatus, setMenuStatus] = useState(false);
  const { checkin } = useCheckInAuth();

  const isActive = (path: string) => location.pathname === path;
  function inputValidator() {
    if (email == "") {
      setErrorMessage("enter details");
      return false;
    } else return true;
  }

  function displayMenu() {
    setMenuStatus(true);
  }

  const checkIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValidator()) return;
    setloading(true);
    try {
      const user = await checkin({ email });
      if (user.status == false) {
        navigate("/enterDetails");
      } else {
        const user_details = user.data;
        localStorage.setItem("name", user_details.name);
        localStorage.setItem("user", user_details.email);
        localStorage.setItem("user_id", user_details.id);

        if (user_details.is_member) {
          navigate("/isMember");
        } else {
          navigate("/enterDetails");
        }
      }
    } catch (error: any) {
      setErrorMessage(
        `${
          error.message == "failed to fetch" ? "network error" : error.message
        }`
      );
    } finally {
      setloading(false);
    }
  };
  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const menuContent = (
    <div
      className={`${
        menuStatus
          ? "block absolute  top-[81px] right-0 lg:top-[42px] lg:right-0 shadow rounded-tl rounded-bl bg-white"
          : "hidden"
      }`}
    >
      <img
        onClick={() => setMenuStatus(false)}
        className="w-[20px] h-[20px] ml-[163px] mr-[22px] mt-[21px]"
        src="Frame.png"
      ></img>
      <Link to="/check-ins">
        <motion.div
          className={`flex items-center px-6 py-3 ${
            isActive("/check-ins") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/chair.png"
            className=" ml-[25px] mr-4 w-6"
            alt="Check In's"
          />
          <span>Check In's</span>
        </motion.div>
      </Link>
      <Link to="/statistics">
        <motion.div
          className={`flex items-center px-6 py-3 ${
            isActive("/statistics") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <ChartNoAxesCombined className="mr-4 ml-[25px]" size={20} />
          <span>Statistics</span>
        </motion.div>
      </Link>
      <Link to="/register">
        <motion.div
          className={`flex items-center px-6 py-3 ${
            isActive("/register") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaUserPlus className="mr-4 ml-[25px]" size={20} />
          <span>Register</span>
        </motion.div>
      </Link>
      <Link to="/schedule">
        <motion.div
          className={`flex items-center px-6 py-3 ${
            isActive("/schedule") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <CalendarCheck2 className="mr-4 ml-[25px]" size={20} />
          <span>Schedule</span>
        </motion.div>
      </Link>
      <Link to="/checkIn">
        <motion.div
          className={`flex items-center px-6 py-3 mt-[127px] ${
            isActive("/schedule") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft className="mr-2 ml-[25px]" size={20} />
          <span>Back to site</span>
        </motion.div>{" "}
      </Link>
    </div>
  );

  return (
    <div className=" relative">
      <div className="relative flex flex-col min-h-screen  w-full overflow-auto ">
        <div className=" flex flex-row  w-[305px] h-[32px] mt-[42px] mb-[69px] lg:w-[1015px] lg:h-[75px] mx-auto lg:mt-[60px] lg:mb-[117px] border-b-5 border-l-2 border-r-2 border-[#FFDD00] border-solid rounded">
          <div className=" flex items-end mb-[20px]">
            <img
              className=" w-[60px] h-[13px] ml-[14px] lg:w-[161.21px] lg:h-[35px] lg:ml-[56px]"
              src="logo.png"
            ></img>
            <p className="ml-[6px] mr-[99px] text-[10px] lg:mr-[547px] lg:ml-[36px] font-semibold lg:text-[20px] ">
              Tech club UNN
            </p>
          </div>
          <img
            onClick={displayMenu}
            className="w-[17px] h-[17px] lg:w-[33px] lg:h-[33px]"
            src="menu.png"
          ></img>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col ml-[43px] mr-[42px] lg:ml-[127px] lg:mr-[62px]">
            <p className=" mb-[16px] lg:mb-[36px] ">
              <span className=" font-bold">BTC UNN</span> a web3 student based
              community to <br />
              designed to faster growth and train tech enthusiast and bring them{" "}
              <br /> On-chain
              <br />
            </p>
            <p className=" mb-[53px] lg:mb-[115px]">
              {" "}
              This is the official login page to users of the{" "}
              <span className="font-bold">hub </span>
              <br /> including members and non-members
            </p>
            <p className=" mb-[25px] lg:mb-[44px]"> Sign in </p>
            <form onSubmit={checkIn}>
              <input
                id="email"
                placeholder="Email..."
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[129px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
              ></input>
              <p className="text-red-500 mb-[10px] text-[20px]">
                {errorMessage}
              </p>
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                className={`  ${
                  loading && "opacity-50 cursor-not-allowed"
                }h-[31px] w-[98px] mb-[35px] text-center p-[10px] lg:h-[57px] lg:w-[178px] lg:mb-[87px] bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded ${
                  children ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!!children}
              >
                {" "}
                Check in
              </motion.button>
            </form>
          </div>
          <img
            src="avatar.jpg"
            className="w-[257px] h-[295px] mx-auto lg:w-[617px] lg:h-[710px] lg:mr-[63px] lg:mb-[87px]"
          ></img>
        </div>
      </div>{" "}
      {children}
      <AnimatePresence>
        {menuStatus && (
          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.5 }}
          >
            {menuContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
