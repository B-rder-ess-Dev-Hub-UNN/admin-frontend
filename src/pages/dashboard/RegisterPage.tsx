import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createMember } from "../../../services/apis/member";
import HeaderProps from "../../componeents/dashboard/HeaderPros";
const Register = () => {
  const [user_name, set_user_name] = useState("");
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsapp_number, set_whatsapp_number] = useState("");
  const [department, setDepartment] = useState("");
  const [tech_stack, settech_stack] = useState("");
  const [date_of_birth, setdate_of_birth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function inputValidator() {
    if (user_name === "" || email === "" || !whatsapp_number) {
      setErrorMessage("fill in all fields");
      return false;
    } else return true;
  }

  const saveDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValidator()) {
      setloading(true);
      try {
        const res = await createMember({
          user_name,
          email,
          whatsapp_number,
          department,
          tech_stack,
          date_of_birth,
        });
        if (res.status == true) {
          navigate("/detailSaved");
        }
      } catch (err: any) {
        setErrorMessage(`${err.message}`);
      } finally {
        setloading(false);
      }
    }
  };
  return (
    <div className="h-full flex flex-col">
      <HeaderProps currentPage="Register" />

      <div className="p-6 flex-1">
        {/* Register page is empty in the mockup */}
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={saveDetails}>
            <input
              id="name"
              placeholder="Name..."
              type="text"
              onChange={(e) => set_user_name(e.target.value)}
              value={user_name}
              className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[37px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>{" "}
            <br />
            <input
              id="email"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="placeholder:opacity-50 placeholder:text-sm placeholder:italic  w-[283px] h-[32px] mb-[40px] lg:mb-[37px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>
            <br />
            <input
              id="number"
              placeholder="whatsapp number"
              type="string"
              onChange={(e) => set_whatsapp_number(e.target.value)}
              value={whatsapp_number}
              className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[44px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>{" "}
            <br />
            <input
              id="department"
              placeholder="department"
              type="string"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[44px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>
            <input
              id="tech_stack"
              placeholder="tech_stack"
              type="string"
              onChange={(e) => settech_stack(e.target.value)}
              value={tech_stack}
              className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[44px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>
            <input
              id="date_of_birth"
              placeholder="date_of_birth"
              type="date"
              onChange={(e) => setdate_of_birth(e.target.value)}
              value={date_of_birth}
              className=" placeholder:opacity-50 placeholder:text-sm placeholder:italic w-[283px] h-[32px] mb-[40px] lg:mb-[44px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
            ></input>
            <p className="text-red-500 mb-[10px] text-[20px]">{errorMessage}</p>
            <motion.button
              whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
              whileHover={{ backgroundColor: "#F4C400" }}
              transition={{ type: "spring", stiffness: "300" }}
              className={` ${
                loading && "opacity-50 cursor-not-allowed"
              } text-[15px] font-bold h-[37px] w-[77px] mb-[35px] lg:text-[25px] lg:h-[57px] lg:w-[178px] lg:mb-[87px] bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded`}
            >
              {" "}
              Save
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
