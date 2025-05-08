//header.tsx

import { Bell, Settings } from 'lucide-react';


const Header = () => {
  return (
  
     <div className="    w-full  bg-white md:sticky fixed  top-0 z-50">
     <div className='bg-white flex md:justify-between items-center  gap-14 px-4 shadow-2xl md:shadow-lg border-b-3  md:border-transparent border-[#FFDD00] md:px-6 py-4 mx-3 md:mx-0 mt-4 md:mt-0 rounded-xl'>
     <div className='flex items-center space-x-1 md:space-x-5'>
        <img src="/logo.png" alt="Logo" className="md:h-8 h-5" />
        <span className="md:text-lg text-sm pt-2 font-semibold text-[#000000]">Tech club UNN</span>
      </div>
      
      <div className="flex md:w-[40%] md:justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border hidden md:block border-gray-300 rounded-full py-2 px-4 w-64 focus:outline-none"
          />
          <span className="absolute right-3 md:right-4 md:top-2.5 top-[-8px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="md:h-5 md:w-5 w-6 h-6 md:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        
       <div className='flex space-x-4 pt-2 md:pt-0 md:space-x-8'>
       <div className="relative">
          <Bell size={20} className='' />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </div>
        
        <Settings size={20} className='' />
       </div>
      </div>
     </div>
    </div>
   
  );
}

export default Header;