import CheckIn from "../componeents/dashboard/CheckIn";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { useCheckInAuth } from "../context/checkInContext";
import { FaArrowLeft } from "react-icons/fa";
import { bookSeat } from "./../../services/apis/seat";
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

  const [current_seat, setcurrent_seat] = useState<Seats>();
  const navigate = useNavigate();
  const [seat, setSeat] = useState<Seats[]>([]);
  const [success_msg, set_success_msg] = useState("");

  // const { user } = useCheckInAuth();
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
  }, [refresh, seat]);

  async function checkOut(data: { seat_id: string }) {
    const res = await checkOutSeat(data);

    return res;
  }
  async function bookseat(data: { seat_id: string; user_id: string }) {
    const res: any = await bookSeat(data);
    return res;
  }

  const proceed = async () => {
    if (!booked_seat) return;
    navigate("/checkIn");
  };
  function seatRow(seatNum1: Seats, seatNum2: Seats) {
    return (
      <div className="flex flex-row ">
        {[seatNum1, seatNum2].map((seat, id) => (
          <div
            className={`flex flex-col mb-[29px] mr-[19px] lg:mb-[18px] lg:mr-[23px] cursor-pointer transition-transform duration-300 transform hover:scale-110 active:scale-105 hover:shadow-lg active:shadow-md   hover:border-gray-300 ${
              seat.is_taken && "opacity-50 "
            }`}
            key={id}
            onClick={() => {
              setcurrent_seat({
                id: seat.id,
                seat_number: seat.seat_number,
                is_taken: seat.is_taken,
              });
              // if (check_if_seat_is_taken(seat.id)) setSeat_is_taken(true);
              setDisplay_box(true);
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
        <div className=" absolute text-center top-40 left-1/2 text-lg font-bold text-[29px]">
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
      <motion.div
        className="absolute top-4 left-6 flex items-center cursor-pointer"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setDisplay_box(false)}
      >
        <FaArrowLeft className="mr-2" size={18} />
        <span>Back</span>
      </motion.div>
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
      <p className="text-center text-green-400 text-[25px] mb-2">
        {success_msg}
      </p>
      <div className="grid grid-row-2 gap-2">
        <motion.button
          onClick={() => {
            if (!user_id || current_seat?.is_taken) {
              return;
            }
            bookseat({ user_id: user_id, seat_id: current_seat?.id! });
            setbooked_seat({ user_id: user_id, seat_id: current_seat?.id! });
            setSeat((prev) =>
              prev.map((s) =>
                s.id === current_seat?.id ? { ...s, is_taken: true } : s
              )
            );
            set_success_msg(
              `Seat ${current_seat?.seat_number} is booked successfully`
            );
          }}
          disabled={!user_id || current_seat?.is_taken}
          whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
          whileHover={{ backgroundColor: "#F4C400" }}
          transition={{ type: "spring", stiffness: "300" }}
          className={`bg-[#FFDD00] text-[15px] font-bold items-center w-[100px] h-[35px] mb-[33px] lg:w-[250px] lg:h-[59px] lg:text-[25px]  lg:mx-auto lg:mb-[48px] ${
            current_seat?.is_taken && "cursor-not-allowed opacity-50"
          }`}
        >
          {" "}
          Book Seat
        </motion.button>
        <motion.button
          onClick={() => {
            checkOut({ seat_id: current_seat?.id! });
            setSeat((prev) =>
              prev.map((s) =>
                s.id === current_seat?.id ? { ...s, is_taken: true } : s
              )
            );
            set_success_msg(
              `Seat ${current_seat?.seat_number} Checked out successfully`
            );
          }}
          whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
          whileHover={{ backgroundColor: "#F4C400" }}
          transition={{ type: "spring", stiffness: "300" }}
          className="bg-[#FFDD00] text-[15px] font-bold items-center w-[100px] h-[35px] mb-[33px] lg:w-[250px] lg:h-[59px] lg:text-[25px]  lg:mx-auto lg:mb-[48px]"
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
        <div>
          <motion.div
            className="absolute flex flex-col lg:flex-row bg-white border-solid rounded border-1 border-yellow-400 w-full max-h-[692px] left-0 bottom-0 lg:left-[191.87px]  lg:top-[215px] lg:max-w-[1129px] lg:max-h-[682px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute top-4 left-6 flex items-center cursor-pointer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/checkIn")}
            >
              <FaArrowLeft className="mr-2" size={18} />
              <span>Back</span>
            </motion.div>
            <div className=" block lg:hidden bg-white  py-2">
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

            <div className="flex flex-col items-center  mt-[20px] lg:mt-[238px]">
              <RefreshCw
                onClick={() => setRefresh((prev) => prev + 1)}
                size={20}
                className="cursor-pointer w-6 h-6 text-black mb-[10px] hover:text-yellow-500 transition"
              />
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                onClick={proceed}
                className={`w-[111px] h-[35px] mx-auto mb-[18px] lg:w-[182px] lg:h-[59px]  bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded lg:mx-auto lg:mb-[50px] ${
                  !booked_seat && "cursor-not-allowed opacity-50"
                }`}
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
