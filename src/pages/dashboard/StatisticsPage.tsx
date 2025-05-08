import { motion } from 'framer-motion';

import {  ChevronRight, User, Star, StarHalf } from 'lucide-react';
import HeaderProps from '../../componeents/dashboard/HeaderPros';
const Statistics = () => {
  return (
    <div className="h-full flex flex-col">
      <HeaderProps currentPage="Statistics" />
      
      <div className="md:p-6 py-6 flex-1">
        <div  className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-8">
          <motion.div 
             className="border rounded-lg p-6 flex flex-col hover:shadow-2xl bg-white gap-2 shadow-xl border-[#FFDD00]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-md font-[400] mb-4">Total Users</h2>
            <div className="flex items-center">
              <div className="w-16 h-16 relative">
              <div className="w-fu aspect-square rounded-full
           border-t-[8px] border-t-[#FFDD00]
           border-r-[8px]  border-r-[#FFDD00]
           border-b-[8px]  border-b-black
           border-l-[8px] border-l-transparent">
</div>
              </div>
              <div className="ml-2 flex items-center">
                <span className="mr-2"><ChevronRight size={18}/></span>
                <span className="font-[400]">80 %</span>
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
                <span className="mr-2"><ChevronRight size={18}/></span>
                <span className="font-[400]">60 %</span>
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
              <div className="w-fu aspect-square rounded-full
           border-t-[8px] border-t-transparent
           border-r-[8px]  border-r-transparent
           border-b-[8px]  border-b-transparent
           border-l-[8px] border-l-black">
</div>
             



              </div>
              <div className="ml-2 flex ">
                <span className="mr-2"><ChevronRight size={18}/></span>
                <span className="font-[400]">20 %</span>
              </div>
            </div>
          </motion.div>
        </div>
        <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
          
        <div className='flex items-center md:flex-row flex-col gap-6'>
        <motion.div 
          className=" w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
         
          <div className="flex flex-col space-y-4">
            <motion.div 
              className="border shadow-md border-[#FFDD00] rounded-lg p-4 flex items-center"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#FFDD00]"><User strokeWidth={1}/></span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-500">Member</div>
              </div>
              <div className="flex">
                {Array(4).fill(0).map((_, i) => (
                  <Star key={i} size={18} className="" />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="border shadow-md border-[#FFDD00] rounded-lg p-4 flex items-center"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#FFDD00]"><User strokeWidth={1}/></span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-500">Member</div>
              </div>
              <div className="flex">
                {Array(3).fill(0).map((_, i) => (
                  <Star key={i} size={18} className="" />
                ))}
               <StarHalf size={18} className="" />
              </div>
            </motion.div>
            
            <motion.div 
              className="border shadow-md border-[#FFDD00] rounded-lg p-4 flex items-center"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-[#FFDD00] rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#FFDD00]"><User strokeWidth={1}/></span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-500">Non - Member</div>
              </div>
              <div className="flex">
                {Array(3).fill(0).map((_, i) => (
                  <Star key={i} size={18} className="" />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className='shadow-md border-[#FFDD00] rounded-md w-full md:w-[40%] h-[260px] border   mx-auto '>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;