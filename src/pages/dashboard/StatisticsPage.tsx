import { motion } from "framer-motion";
import { userStats } from "../../../services/apis/dashboard";
import { useEffect, useState } from "react";
import { checkIfUserExists } from "../../../services/apis/member";
import { ChevronRight, User, Star, StarHalf } from "lucide-react";
import HeaderProps from "../../componeents/dashboard/HeaderPros";
const Statistics = () => {
  const [member_percentage, setMember_percentage] = useState(0);
  const [non_member_percentage, setNon_member_percentage] = useState(0);
  const [total_checked_in_users, setTotal_checked_in_users] = useState(0);
  const [userStatuses, setUserStatuses] = useState<
    Record<string, "member" | "non-member">
  >({});

  useEffect(() => {
    async function statsResponse() {
      const res = await userStats();
      console.log(res);
      const statsData = res.data;
      setMember_percentage(statsData.member_percentage);
      setNon_member_percentage(statsData.non_member_percentage);
      setTotal_checked_in_users(statsData.total_checked_in_users);

      const status: Record<string, "member" | "non-member"> = {};

      await Promise.all(
        checked_in_users.map(async (user) => {
          try {
            const res = await checkIfUserExists({ email: user.email });
            status[user.email] = res.status ? "member" : "non-member";
          } catch (error) {
            status[user.email] = "non-member";
          }
        })
      );
      setUserStatuses(userStatuses);
    }
    statsResponse();
  }, []);
  const checked_in_users: any[] = JSON.parse(
    localStorage.getItem("checked_in_users") || "[]"
  );

  return (
    <div className="h-full flex flex-col">
      <HeaderProps currentPage="Statistics" />

      <div className="md:p-6 py-6 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-8">
          <motion.div
            className="border rounded-lg p-6 flex flex-col hover:shadow-2xl bg-white gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-md font-[400] mb-4">Total Users</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 relative">
                <div
                  className="w-fu aspect-square rounded-full
           border-t-[8px] border-t-[#FFDD00]
           border-r-[8px]  border-r-[#FFDD00]
           border-b-[8px]  border-b-black
           border-l-[8px] border-l-transparent"
                ></div>
              </div>
              <div className="ml-2 flex items-center">
                <span className="mr-2">
                  <ChevronRight size={18} />
                </span>
                <span className="font-[400]">
                  {total_checked_in_users && total_checked_in_users}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="border rounded-lg p-6 flex flex-col hover:shadow-2xl bg-white gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-md font-[400] mb-4">Members</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 relative">
                <div className="w-full h-full rounded-full border-[8px] border-[#FFDD00] border-t-transparent border-l-transparent"></div>
              </div>
              <div className="ml-2 flex items-center">
                <span className="mr-2">
                  <ChevronRight size={18} />
                </span>
                <span className="font-[400]">
                  {member_percentage && member_percentage}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="border rounded-lg col-span-2 md:col-span-1 mx-auto md:mx-0 p-6 flex flex-col hover:shadow-2xl bg-white gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-md font-[400] mb-4">Non - Members</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 relative">
                <div
                  className="w-fu aspect-square rounded-full
           border-t-[8px] border-t-transparent
           border-r-[8px]  border-r-transparent
           border-b-[8px]  border-b-transparent
           border-l-[8px] border-l-black"
                ></div>
              </div>
              <div className="ml-2 flex ">
                <span className="mr-2">
                  <ChevronRight size={18} />
                </span>
                <span className="font-[400]">
                  {non_member_percentage && non_member_percentage}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>

        <div className="flex items-center md:flex-row flex-col gap-6">
          <motion.div
            className=" w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col space-y-4">
              {checked_in_users?.map((user) => (
                <motion.div
                  className="border shadow-md border-[#FFDD00] rounded-lg p-4 flex items-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#FFDD00]">
                      <User strokeWidth={1} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      {userStatuses[user.email] || "loading"}
                    </div>
                  </div>
                  <div className="flex">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={18} className="" />
                      ))}
                    <StarHalf size={18} className="" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="shadow-md border-[#FFDD00] rounded-md w-full md:w-[40%] h-[260px] border   mx-auto "></div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
