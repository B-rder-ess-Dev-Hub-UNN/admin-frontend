import CheckIn from "../componeents/dashboard/CheckIn";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCheckInAuth } from "../context/checkInContext";
import { seatState } from "./../../services/apis/seat";
import { checkOutSeat } from "./../../services/apis/seat";

type BookSeat = {
  seat_id: string;
  user_id: string;
};
type Seats = {
  id: string;
  seat_number: number;
  is_taken: boolean;
};
export default function Seats() {
  const [refresh, setRefresh] = useState(0);
  const [booked_seat, setbooked_seat] = useState<BookSeat>();
  const [display_box, setDisplay_box] = useState(false);
  const [current_seat, setcurrent_seat] = useState<string>("");
  const navigate = useNavigate();
  const [seat, setSeat] = useState<Seats[]>([]);

  const { user } = useCheckInAuth();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    try {
      const controller = new AbortController();

      const fetchSeat = async () => {
        const res = await seatState({ signal: controller.signal });
        const aval_seat = res.data;

        setSeat(aval_seat);
      };

      fetchSeat();
      return () => controller.abort();
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted, no worries.");
      } else console.log("seat error", error);
    }
  }, [refresh]);

  async function checkOut(data: { seat_id: string }) {
    const res = await checkOutSeat(data);
    navigate("/checkIn");
    return res;
  }
  const proceed = async () => {
    if (booked_seat) {
      localStorage.setItem("seat_id", booked_seat.seat_id);
    }
    user?.msg === "Hub user exists"
      ? navigate("/checkIn")
      : navigate("/nonMember");
  };
  function seatRow(seatNum1: Seats, seatNum2: Seats) {
    return (
      <div className="flex flex-row ">
        {[seatNum1, seatNum2].map((seat, id) => (
          <div
            className={`flex flex-col mb-[29px] mr-[19px] lg:mb-[18px] lg:mr-[23px] ${
              seat.is_taken ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            key={id}
            onClick={() => {
              if (seat.is_taken) return;
              setDisplay_box(!display_box);
              setcurrent_seat(seat.id);
            }}
          >
            <p className="text-center">{seat.seat_number}</p>
            <img
              className="w-[30px] h-[30px] mb-[11px] mt-[3px] lg:w-[42px] lg:h-[42px] lg:mt-[19.11px] lg:mb-[21.5px]"
              src="chair.png"
            ></img>
            {seat.is_taken ? (
              <img
                className="w-[16px] h-[16px] lg:w-[20.13px] lg:h-[20.13px]"
                src={`${seat.is_taken ? "checked.jpg" : "redChecked.jpg"}`}
              ></img>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  }
  if (seat.length < 10) {
    return (
      <CheckIn>
        <div className="text-center mt-100 text-lg font-bold text-[39px]">
          Loading seats...
        </div>
      </CheckIn>
    );
  }

  const dialog_box = (
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

      <div className="flex flex-row justify-center items-center mb-[38px] lg:mb-[64px]">
        <h1 className="text-[15px]  lg:font-bold">member</h1>
        <img
          src="checked.jpg"
          className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
        ></img>
      </div>

      <div className="flex flex-row">
        <motion.button
          onClick={() => {
            if (!user_id) {
              console.log("useridnot available");
            } else {
              setbooked_seat({ user_id: user_id, seat_id: current_seat });
              setDisplay_box(false);
            }
          }}
          whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
          whileHover={{ backgroundColor: "#F4C400" }}
          transition={{ type: "spring", stiffness: "300" }}
          className="bg-[#FFDD00] text-[15px] font-bold items-center w-[123px] h-[35px] mb-[33px] lg:w-[293px] lg:h-[59px] lg:text-[25px]  lg:mx-auto lg:mb-[48px]"
        >
          {" "}
          Book Seat
        </motion.button>
        <motion.button
          onClick={() => {
            checkOut({ seat_id: current_seat });
            setDisplay_box(false);
          }}
          whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
          whileHover={{ backgroundColor: "#F4C400" }}
          transition={{ type: "spring", stiffness: "300" }}
          className="bg-[#FFDD00] text-[15px] font-bold items-center w-[123px] h-[35px] mb-[33px] lg:w-[293px] lg:h-[59px] lg:text-[25px]  lg:mx-auto lg:mb-[48px]"
        >
          {" "}
          Check Out
        </motion.button>
      </div>
      <p className="text-center mb-[46px] lg:mr-[23.57px] lg:ml-[27px] lg:text-[17px]">
        You now have access to make use of the Borderless <br /> web3 product
        house
      </p>
    </motion.div>
  );

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
                {seatRow(seat[0], seat[1])}
                {seatRow(seat[4], seat[5])}
                {seatRow(seat[8], seat[9])}
              </div>
              <div className="flex flex-col">
                {seatRow(seat[2], seat[3])}
                {seatRow(seat[6], seat[7])}
              </div>
            </div>

            <div className="flex flex-col lg:ml-[28px] lg:mt-[238px]">
              <RefreshCw
                onClick={() => setRefresh((prev) => prev + 1)}
                size={20}
                className="cursor-pointer w-6 h-6 text-black hover:text-yellow-500 transition"
              />
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                onClick={proceed}
                className="w-[111px] h-[35px] mx-auto mb-[18px] lg:w-[182px] lg:h-[59px]  bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded lg:mx-auto lg:mb-[50px]"
              >
                Proceed
              </motion.button>
              <p className=" text-[10px] mb-[27px] lg:text-[17px] text-center">
                You now have access to make use of the Borderless <br /> web3
                product house
              </p>
            </div>
          </motion.div>
          {display_box && dialog_box}
        </div>
      </CheckIn>
    </div>
  );
}
