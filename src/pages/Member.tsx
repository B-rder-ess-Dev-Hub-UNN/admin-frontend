// import { useState } from "react";
import { motion } from "framer-motion";
import { useCheckInAuth } from "../context/checkInContext";
import { useNavigate } from "react-router-dom";
import CheckIn from "../componeents/dashboard/CheckIn";

export default function Member() {
  const navigate = useNavigate();
  const { user } = useCheckInAuth();

  const getSeat = () => {
    navigate("./seats");
  };
  return (
    <div>
      <CheckIn>
        <motion.div
          className=" absolute flex flex-col justify-center items-center w-full bg-white z-10 left-0 right-0 bottom-0 lg:max-h-[476px] lg:max-w-[788px] lg:top-[253px] lg:bottom-[253px] lg:left-[362px] border-1 border-yellow-400 border-solid rounded lg:pt-[15px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            className="h-[52px] w-[43px] mt-[39px] mb-[20px] lg:w-[71px] lg:h-[85px] lg:mb-[25px] lg:mt-[15px]"
            src="borderless_logo.jpg"
          ></img>
          <div className="flex flex-row justify-center items-center mb-[37px] lg:mb-[5px]">
            <h1 className="text-[15px] lg:text-xl font-bold">MEMBER</h1>
            <img
              src="checked.jpg"
              className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
            ></img>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className=" mb-[8px] lg:mb-[18px]">{`Name ${user?.name}`}</p>
            <p className=" mb-[42px] lg:mb-[49px]">{`Email ${user?.email}`}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
            whileHover={{ backgroundColor: "#F4C400" }}
            transition={{ type: "spring", stiffness: "300" }}
            onClick={getSeat}
            className="w-[111px] h-[35px] mb-[23px] text-[15px] font-semibold lg:text-[25px] lg:w-[182px] lg:h-[59px] lg:mb-[45px] bg-yellow-400 border-[#FFDD00] border-2 border-solid rounded"
          >
            Get a Seat
          </motion.button>
          <p className=" text-[10px] mb-[22px] lg:mb-[32px] text-center">
            You now have access to make use of the Borderless <br /> web3
            product house
          </p>
        </motion.div>
      </CheckIn>
    </div>
  );
}
