import CheckIn from "../componeents/dashboard/CheckIn";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import memberContext from "../context/isMemberContext";

export default function Seats() {
  const navigate = useNavigate();
  const isMember = memberContext();

  const proceed = () => {
    isMember ? navigate("/checkIn") : navigate("/paymentMade");
  };
  function seatRow(seatNum1: number, seatNum2: number, seatNum3: number) {
    return (
      <div className="flex flex-row ">
        <div className=" flex flex-col mb-[29px] mr-[19px] lg:mb-[18px] lg:mr-[23px]">
          <p className="text-center">{seatNum1}</p>
          <img
            className="w-[30px] h-[30px] mb-[11px] mt-[3px] lg:w-[42px] lg:h-[42px] lg:mt-[19.11px] lg:mb-[21.5px]"
            src="chair.png"
          ></img>
          <img
            className="w-[16px] h-[16px] lg:w-[20.13px] lg:h-[20.13px]"
            src="checked.jpg"
          ></img>
        </div>
        <div className=" flex flex-col mb-[29px] mr-[19px] lg:mb-[18px] lg:mr-[23px]">
          <p className="text-center">{seatNum2}</p>
          <img
            className="w-[30px] h-[30px] mb-[11px] mt-[3px] lg:w-[42px] lg:h-[42px] lg:mt-[19.11px] lg:mb-[21.5px]"
            src="chair.png"
          ></img>
          <img
            className="w-[16px] h-[16px] lg:w-[20.13px] lg:h-[20.13px]"
            src="checked.jpg"
          ></img>
        </div>
        <div className=" flex flex-col mb-[29px] lg:mb-[18px]">
          <p className="text-center">{seatNum3}</p>
          <img
            className="w-[30px] h-[30px] mb-[11px] mt-[3px] lg:w-[42px] lg:h-[42px] lg:mt-[19.11px] lg:mb-[21.5px]"
            src="chair.png"
          ></img>
          <img
            className="w-[16px] h-[16px] lg:w-[20.13px] lg:h-[20.13px]"
            src="checked.jpg"
          ></img>
        </div>
      </div>
    );
  }
  //   const seats = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div>
      <CheckIn>
        <div className="">
          <motion.div
            className="absolute flex flex-col lg:flex-row bg-white border-solid rounded border-1 border-yellow-400 w-full left-0 bottom-0 lg:left-[191.87px]  lg:top-[215px] lg:max-w-[1129px] lg:max-h-[682px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" block lg:hidden absolute top-0 left-0 w-full bg-white z-10 py-2">
              <h1 className="text-[15px] mt-[34px] font-bold text-center">
                Sitting Arrangement
              </h1>
              <p className="text-[15px] mt-[20px] text-center">Get a set</p>
            </div>
            <div className="flex flex-row lg:mt-[15px]">
              <div className="flex flex-col ml-[25px] mr-[87px] lg:mr-[148px] lg:ml-[137px]">
                {seatRow(1, 2, 3)}
                {seatRow(7, 8, 9)}
                {seatRow(13, 14, 15)}
                {seatRow(19, 20, 21)}
              </div>
              <div className="flex flex-col">
                {seatRow(4, 5, 6)}
                {seatRow(10, 11, 12)}
                {seatRow(16, 17, 18)}
                {seatRow(22, 23, 24)}
              </div>
            </div>

            <div className="flex flex-col lg:ml-[28px] lg:mt-[238px]">
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                onClick={proceed}
                className="w-[111px] h-[35px] mx-auto mb-[18px] lg:w-[182px] lg:h-[59px] border-solid rounded bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded lg:mx-auto lg:mb-[50px]"
              >
                Proceed
              </motion.button>
              <p className=" text-[10px] mb-[27px] lg:text-[17px] text-center">
                You now have access to make use of the Borderless <br /> web3
                product house
              </p>
            </div>
          </motion.div>
        </div>
      </CheckIn>
    </div>
  );
}
