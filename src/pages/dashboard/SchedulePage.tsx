import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderProps from '../../componeents/dashboard/HeaderPros';
import { ChevronDown, Bell } from 'lucide-react';
const Schedule = () => {
  // State for selected dates
  const [bookingDate, setBookingDate] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Track which input is currently active
  const [activeInput, setActiveInput] = useState<string | null>(null);
  
  // Calendar navigation functions
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Get month name
  const getMonthName = (month: number): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  };
  
  // Generate calendar days for the current month
  const generateCalendarDays = (): (number | null)[] => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create array for empty cells before first day
    const blanks = Array(firstDayOfMonth).fill(null);
    
    // Create array for days in month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return [...blanks, ...days];
  };
  
  // Format date for input fields
  const formatDate = (day: number): string => {
    if (!day) return '';
    const date = new Date(currentYear, currentMonth, day);
    return date.toLocaleDateString('en-US');
  };
  
  // Handle day selection
  const handleDayClick = (day: number | null): void => {
    if (!day) return; // Ignore clicks on blank cells
    
    setSelectedDay(day);
    const formattedDate = formatDate(day);
    
    // Update the active input with the selected date
    if (activeInput === 'booking') {
      setBookingDate(formattedDate);
    } else if (activeInput === 'event') {
      setEventDate(formattedDate);
    }
  };
  
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="h-full flex flex-col">
      <HeaderProps currentPage="Schedule" />
      
      <div className="md:p-6 py-6 px-4 flex-1 ">
        <div className="flex md:justify-between flex-col md:flex-row gap-6">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex md:items-center w-[80%] md:w-full md:flex-row flex-col gap-8'>
            <div>
              <label className="block text-md font-medium mb-4">Booking Date</label>
             <div className={`w-full border text-sm flex items-center justify-between   ${activeInput === 'booking' ? 'border-[#FFDD00] ring-1 ring-[#FFDD00]' : 'border-gray-200'} rounded-full px-3 py-2 focus:outline-none`}>
             <input 
                id="booking-date"
                type="text" 
                    className='border-0 ring-0 outline-0 placeholder-black'
                placeholder="Date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                onClick={() => setActiveInput('booking')}
                readOnly
              />
              <ChevronDown size={18}/>
             </div>
            </div>
            
            <div className=''>
              <label className="block text-md font-medium mb-4">Event Date</label>
              <div  className={`w-full flex items-center justify-between  border ${activeInput === 'event' ? 'border-[#FFDD00] ring-1 ring-[#FFDD00]' : 'border-gray-200'} rounded-full px-3 py-2 focus:outline-none `}>
              <input 
                id="event-date"
                type="text" 
               className='border-0 ring-0 outline-0 placeholder-black'
                placeholder="Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                onClick={() => setActiveInput('event')}
                readOnly
              />
              <ChevronDown size={18}/>
              </div>
            </div>
            </div>
            
            <div>
              <label className="block text-md font-medium mb-4">Event Organizer</label>
              <input 
                type="text" 
                className="md:w-[60%] w-full h-20  border border-[#FFDD00] shadow rounded-lg p-3 focus:outline-none" 
              />
            </div>
          </motion.div>
          
          <div className='md:w-[70%]'>
        <motion.div
            className={`border ${activeInput ? 'border-[#FFDD00] shadow-md' : 'border-[#FFDD00] shadow-md'} rounded-lg p-6 ${activeInput ? 'shadow-md' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            <div className="flex justify-between items-center mb-6">
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                onClick={goToPrevMonth}
              >
                <FaChevronLeft />
              </button>
              <h2 className="text-xl font-bold">
                {getMonthName(currentMonth)} {currentYear}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                onClick={goToNextMonth}
              >
                <FaChevronRight />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* Day headers */}
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="font-medium mb-2">{day}</div>
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  onClick={() => handleDayClick(day)}
                  className={`
                    py-2 rounded-full cursor-pointer transition-colors
                    ${day === selectedDay ? ' text-black rounded-full' : ''}
                    ${day ? (activeInput ? 'hover:bg-blue-100' : 'hover:bg-gray-100') : ''}
                    ${!day ? 'cursor-default' : ''}
                    ${!activeInput ? 'opacity-75' : ''}
                  `}
                >
                  {day || ''}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
          className="mt-8 border border-[#FFDD00] shadow-md rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-center gap-6 items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-center">Events</h2>
            <Bell className=" cursor-pointer transition-colors" />
          </div>
          
          <div className="p-4">
            <div className="border border-[#FFDD00] shadow-md  rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow">
              <div >
                <div className='space-y-1'>
                  <h3 className="font-semibold">BTC UNN's Hangout</h3>
                  <div className='flex items-center justify-between'>
                  <div className="text-sm text-gray-500">Sat, 12th   3pm</div>
                  <div className="text-sm text-gray-500">4 Days Left</div>
                </div>
                </div>
                
              </div>
            </div>
            
            <div className="border border-[#FFDD00] shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow">
              <div >
                <div className='space-y-1'>
                  <h3 className="font-semibold">Blockchain UNN</h3>
                 <div className='flex items-center justify-between'>
                 <div className="text-sm text-gray-500">Fri, 26th   3pm</div>
                 <div className="text-sm  text-gray-500">15 Days Left</div>
                 </div>
                </div>
                
              </div>
            </div>
          </div>
        </motion.div>
        </div>
          
        </div>
        
        
       
      </div>
    </div>
  );
}

export default Schedule;