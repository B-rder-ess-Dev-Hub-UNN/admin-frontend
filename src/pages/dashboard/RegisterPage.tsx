import { motion } from 'framer-motion';
import HeaderProps from '../../componeents/dashboard/HeaderPros';
const Register = () => {
  return (
    <div className="h-full flex flex-col">
      <HeaderProps currentPage="Register" />
      
      <div className="p-6 flex-1">
        {/* Register page is empty in the mockup */}
        <motion.div
          className="flex items-center justify-center h-full text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Register page content would go here
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
