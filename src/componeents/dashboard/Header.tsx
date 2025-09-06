import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ConciergeBell } from "lucide-react";
import type { availablePlan } from "./../../App";

const Header = ({
  time_expired,
  available_plan,
}: {
  time_expired: (time: Date) => boolean;
  available_plan: availablePlan[];
}) => {
  const [expired_seat, set_expired_seat] = useState<string[]>([]);
  const [display_exp_msg, set_display_exp_msg] = useState(false);

  useEffect(() => {
    const checkExpiredSeats = () => {
      const expiredSeats: string[] = [];

      for (let i = 0; i < available_plan.length; i++) {
        if (time_expired(available_plan[i].expires_at)) {
          expiredSeats.push(available_plan[i].seat_id);
        }
      }

      set_expired_seat(expiredSeats);
    };

    checkExpiredSeats(); // run immediately once
    const interval = setInterval(checkExpiredSeats, 300 * 1000); // run every 1 min

    return () => clearInterval(interval);
  }, [available_plan, time_expired]);

  const expired_msg = (
    <div className="w-fit h-fit p-2 shadow-2xl">
      {expired_seat.map((seat, i) => (
        <div className="flex flex-row">
          <p className="mr-2 my-2">Seat number {seat} time is up</p>
          <button
            className="rounded-md focus:outline-none "
            onClick={() => {
              const indexToRemove = i;

              const updated_seats = expired_seat.filter(
                (_, i) => i !== indexToRemove
              );

              set_expired_seat(updated_seats);
            }}
          >
            <FaTimes size={15} className="text-gray-700" />
          </button>
        </div>
      ))}
    </div>
  );
  return (
    <div className="w-full bg-white md:sticky fixed top-0 z-50">
      <div className="bg-white flex md:justify-between items-center gap-14 px-4 shadow-2xl md:shadow-lg border-b-3 md:border-transparent border-[#FFDD00] md:px-6 py-4 mx-3 md:mx-0 mt-4 md:mt-0 rounded-xl">
        <div className="flex items-center space-x-1 md:space-x-5">
          <img src="/logo.png" alt="Logo" className="md:h-8 h-5" />
          <span className="md:text-lg text-sm pt-2 font-semibold text-[#000000]">
            Tech club UNN
          </span>
        </div>

        <div className="flex justify-end ml-auto relative">
          <button
            className=" rounded-md right-6  focus:outline-none relative"
            onClick={() => set_display_exp_msg(!display_exp_msg)}
          >
            <ConciergeBell size={24} />
            {expired_seat.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {expired_seat.length}
              </span>
            )}
          </button>
          {display_exp_msg && (
            <div className="absolute  top-2 right-2 ">{expired_msg}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
