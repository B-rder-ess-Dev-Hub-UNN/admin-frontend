import CheckIn from "../componeents/dashboard/CheckIn";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function PaymentMade() {
  const navigate = useNavigate();

  const enterDetails = () => {
    navigate("/checkIn");
  };
  return (
    <div>
      <CheckIn>
        <motion.div
          className="absolute flex flex-col justify-center items-center bg-white w-full bottom-0 left-0  lg:max-h-[540px] lg:max-w-[894px] lg:top-[253px] lg:bottom-[253px] lg:left-[200px] border-1 border-yellow-400 border-solid rounded"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            className="h-[52px] w-[43.26px] mt-[15px] mb-[21px] lg:w-[71px] lg:h-[85px] lg:mb-[25px] lg:mt-[15px]"
            src="borderless_logo.jpg"
          ></img>
          <div className="flex flex-row justify-center items-center mb-[20px] lg:mb-[18px]">
            <h1 className=" text-[15px] font-bold">Not a MEMBER</h1>
            <img
              src="redChecked.jpg"
              className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
            ></img>
          </div>
          <div className="flex flex-row justify-center items-center mb-[38px] lg:mb-[64px]">
            <h1 className="text-[15px]  lg:font-bold">Payment made</h1>
            <img
              src="checked.jpg"
              className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
            ></img>
          </div>

          <motion.button
            onClick={enterDetails}
            whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
            whileHover={{ backgroundColor: "#F4C400" }}
            transition={{ type: "spring", stiffness: "300" }}
            className="bg-[#FFDD00] text-[15px] font-bold items-center w-[123px] h-[35px] mb-[33px] lg:w-[293px] lg:h-[59px] lg:text-[25px]  lg:mx-auto lg:mb-[48px]"
          >
            {" "}
            Back to check-In page
          </motion.button>
          <p className="text-center mb-[46px] lg:mr-[23.57px] lg:ml-[27px] lg:text-[17px]">
            You now have access to make use of the Borderless <br /> web3
            product house
          </p>
        </motion.div>
      </CheckIn>
    </div>
  );
}
