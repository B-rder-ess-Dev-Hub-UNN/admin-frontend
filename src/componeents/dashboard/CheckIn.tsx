import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import setMemberContext from "../../context/isMemberContext";
import { ChartNoAxesCombined, CalendarCheck2 } from "lucide-react";
import { FaUserPlus } from "react-icons/fa";

export default function CheckIn({ children }: { children?: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [menuStatus, setMenuStatus] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  function inputValidator() {
    if (email == "") {
      setErrorMessage("enter details");
      return false;
    } else return true;
  }

  function displayMenu() {
    setMenuStatus(!menuStatus);
  }

  const checkIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValidator()) {
      try {
        const res = await fetch("*", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          //   localStorage.setItem("token", data.token);
          if (data.data.isMember) {
            setMemberContext(true);
            navigate("./member");
          } else navigate("./nonMember");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("Network issue");
      }
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
          ? "block absolute right-[79px]~ top-[42px] lg:right-[283px] bg-white"
          : "hidden"
      }`}
    >
      <Link to="/check-ins">
        <motion.div
          className={`flex items-center px-6 py-3 ${
            isActive("/check-ins") ? "font-bold bg-gray-100" : ""
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/chair.png" className="mr-4 w-6" alt="Check In's" />
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
          <ChartNoAxesCombined className="mr-4" size={20} />
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
          <FaUserPlus className="mr-4" size={20} />
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
          <CalendarCheck2 className="mr-4" size={20} />
          <span>Schedule</span>
        </motion.div>
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
            src={`${menuStatus ? "redChecked.jpg" : "menu.png"}`}
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
                className=" w-[283px] h-[32px] mb-[40px] lg:mb-[129px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
              ></input>
              <p className="text-red-500 mb-[10px] text-[20px]">
                {errorMessage}
              </p>
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                className=" h-[31px] w-[98px] mb-[35px] lg:h-[57px] lg:w-[178px] lg:mb-[87px] bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded"
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
            transition={{ duration: 1 }}
          >
            {menuContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
