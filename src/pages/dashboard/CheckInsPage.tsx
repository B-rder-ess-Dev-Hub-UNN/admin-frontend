import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import HeaderProps from "../../componeents/dashboard/HeaderPros";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkin } from "../../../services/apis/dashboard";

const CheckIns = () => {
  const [checked_in_users, setChecked_in_users] = useState<any[]>([]);
  const [available_seats, setAvailable_seats] = useState<number>(0);
  const [error_message, set_error_message] = useState("");
  const [loading, set_loading] = useState(false);
  useEffect(() => {
    async function checkin() {
      try {
        set_loading(true);
        const res = await Checkin();
        const check_in_stats = res.data;
        setChecked_in_users(check_in_stats.checked_in_users);
        setAvailable_seats(check_in_stats.available_seats);
        localStorage.setItem(
          "checked_in_users",
          JSON.stringify(check_in_stats.checked_in_users)
        );
        set_loading(false);
      } catch (error: any) {
        set_loading(false);
        set_error_message(
          error_message == "failed to fetch" ? "network error" : error.message
        );
      }
    }

    checkin();
  }, []);
  return (
    <div className="h-full flex  flex-col bg-white">
      <div className="md:p-6 px-2 flex-1 z-20">
        <HeaderProps currentPage="Check In's" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 pt-4 md:pt-0">
          <motion.div
            className="border rounded-2xl p-4 md:p-6 flex flex-col hover:shadow-2xl bg-white md:gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-[400] mb-3 md:mb-4">Accepted</h2>
            <div className="flex items-center">
              <FaUser className="mr-2" size={14} />
              <span className="mr-2">{">"}</span>
              <span className="font-[400] text-sm ">
                {checked_in_users?.length || "..."}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="border rounded-2xl p-4 justify-center  md:p-6 flex flex-col hover:shadow-2xl bg-white md:gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-[400] mb-3 md:mb-4">Seats Available</h2>
            <div className="flex items-center ">
              <img src="/chair.png" className="mr-2 w-5" />
              <span className="mr-2">{">"}</span>
              <span className="font-[400] text-sm">
                {available_seats || "..."}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-[400] mb-4">Attendance</h2>
          <div className="border border-gray-200 overflow-x-scroll rounded-lg overflow-hidden">
            {!loading ? (
              <table className="min-w-full ">
                <thead>
                  <tr className=" border-b font-[400] border-gray-200">
                    <th className="py-4 px-6 text-left">Seat Number</th>
                    <th className="py-4 px-6 text-left">Name</th>
                    <th className="py-4 px-6 text-left">Email</th>
                    <th className="py-4 px-6 text-left">Star rating</th>
                  </tr>
                </thead>

                <tbody>
                  {checked_in_users?.map((user, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="py-4 px-6">{user.seat_number} </td>
                      <td className="py-4 px-6">{user.name} </td>
                      <td className="py-4 px-6">{user.email} </td>
                      <td className="py-4 px-6 flex items-center gap-1">
                        <Star size={18} color="#FFDD00" />{" "}
                        <Star size={18} color="#FFDD00" />{" "}
                        <Star size={18} color="#FFDD00" /> <Star size={18} />{" "}
                        <Star size={18} />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-8">
                {error_message !== "" ? error_message : "loading..."}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckIns;
