import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GuestDetails({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState<number | string>();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function inputValidator() {
    if (name === "" || email === "" || number === "") {
      setErrorMessage("fill in all fields");
      return false;
    } else return true;
  }

  const saveDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValidator()) {
      try {
        const res = await fetch("", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, number }),
        });

        const data = await res.json();

        if (res.ok) {
          navigate("./detailSaved");
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        setErrorMessage("network error");
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative flex flex-col blur-sm min-h-screen w-full overflow-auto ">
        <div className=" flex flex-row  w-[305px] h-[32px] mt-[42px] mb-[69px] lg:w-[1015px] lg:h-[75px] mx-auto lg:mt-[60px] lg:mb-[117px] border-b-5 border-l-2 border-r-2 border-[#FFDD00] border-solid rounded">
          <div className=" flex items-end mb-[20px]">
            <img
              className=" w-[60px] h-[13px] ml-[14px] lg:w-[161.21px] lg:h-[35px] lg:ml-[56px]"
              src="logo.png"
            ></img>
            <p className="ml-[6px] mr-[99px] text-[10px] lg:mr-[547px] lg:ml-[36px] font-semibold lg:text-[20px] ">
              Tech club UNN
            </p>
          </div>
          <img
            className="w-[17px] h-[17px] lg:w-[33px] lg:h-[33px]"
            src="menu.png"
          ></img>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col ml-[43px] mr-[42px] lg:ml-[127px] lg:mr-[62px]">
            <p className=" mb-[16px] lg:mb-[36px] ">
              <span className=" font-bold">BTC UNN</span> a web3 student based
              community to <br />
              designed to faster growth and train tech enthusiast and bring them{" "}
              <br /> On-chain
              <br />
            </p>
            <p className=" mb-[53px] lg:mb-[115px]">
              {" "}
              This is the official login page to users of the{" "}
              <span className="font-bold">hub </span>
              <br /> including members and non-members
            </p>
            <p className=" text-[25px] font-bold mb-[25px] lg:mb-[44px]">
              {" "}
              Sign in{" "}
            </p>
            <form onSubmit={saveDetails}>
              <input
                id="name"
                placeholder="Name..."
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className=" w-[283px] h-[32px] mb-[40px] lg:mb-[37px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
              ></input>{" "}
              <br />
              <input
                id="email"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" w-[283px] h-[32px] mb-[40px] lg:mb-[37px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
              ></input>
              <br />
              <input
                id="number"
                placeholder="Phone number"
                type="number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className=" w-[283px] h-[32px] mb-[40px] lg:mb-[44px] p-[10px] lg:w-[541px] lg:h-[62px] border-1 border-[#FFDD00] border-solid rounded"
              ></input>{" "}
              <br />
              <p className="text-red-500 mb-[10px] text-[20px]">
                {errorMessage}
              </p>
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                whileHover={{ backgroundColor: "#F4C400" }}
                transition={{ type: "spring", stiffness: "300" }}
                className=" text-[15px] font-bold h-[37px] w-[77px] mb-[35px] lg:text-[25px] lg:h-[57px] lg:w-[178px] lg:mb-[87px] bg-[#FFDD00] border-1 border-[#FFDD00] border-solid rounded"
              >
                {" "}
                Save
              </motion.button>
            </form>
          </div>
          <img
            src="avatar.jpg"
            className="w-[257px] h-[295px] mx-auto lg:w-[617px] lg:h-[710px] lg:mr-[63px] lg:mb-[87px]"
          ></img>
        </div>
      </div>
      {children}
    </div>
  );
}
