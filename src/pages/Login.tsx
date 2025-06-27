import { useState } from "react";
import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErroMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function inputValidator() {
    if (password != confirmPass) {
      setErroMessage("password not the same");
      return false;
    } else if (email == "" || password == "" || confirmPass == "") {
      setErroMessage("fill in all fields");
      return false;
    } else return true;
  }
  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValidator()) {
      try {
        const res = await fetch("*/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        const { token } = data.data;

        if (res.ok) {
          login(token);
          navigate("./checkIn");
        } else {
          setErroMessage(data.message);
        }
      } catch (err) {
        setErroMessage("Network error");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col mx-auto  w-full h-screen overflow-auto ">
        <img
          className=" w-[82px] h-[94px] mx-auto mt-[154px] lg:w-[125px] lg:h-[143.88px] lg:mt-[2px]"
          src="avatar.jpg"
        ></img>
        <img
          className=" w-[142px] h-[31px] lg:w-[262.21px] lg:h-[57px] mx-auto"
          src="logo.png"
        ></img>
        <h1 className="font-bold mb-[36px] mt-[10px] lg:mt-[16px] text-center">
          {" "}
          Tech club unn
        </h1>
        <p className="mb-[26px] lg:mb-[30px] text-center">
          <span className=" font-bold">BTC UNN</span> a web3 student based
          community to <br />
          designed to faster growth and train tech enthusiast and bring them{" "}
          <br /> On-chain
          <br />
        </p>
        <p className="mb-[59px] lg:mb-[33px] text-center">
          {" "}
          This is the official login page to users of the{" "}
          <span className="font-bold">hub </span>
          <br /> including members and non-members
        </p>
        <p className="font-bold text-center"> ADMIN Log In</p>
        <form onSubmit={logIn} className="mx-auto flex flex-col items-center">
          <input
            id="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-[20px] p-[10px] w-[283px] h-[32px] lg:w-[541px] lg:h-[62px] lg:mt-[16px] border-1 border-[#FFDD00] border-solid rounded"
            type="text"
          ></input>
          <br />
          <input
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-[20px] p-[10px] w-[283px] h-[32px] lg:w-[541px] lg:h-[62px] lg:mt-[16px] border-1 border-[#FFDD00] border-solid rounded"
            type="password"
          ></input>
          <br />
          <input
            id="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            className="mt-[20px] p-[10px] w-[283px] h-[32px]  lg:w-[541px]  lg:h-[62px] lg:mt-[16px] border-1 border-[#FFDD00] border-solid rounded"
            type="password"
          ></input>
          <br />
          <p className="text-red-500 mb-[10px] text-[20px]">{errorMessage}</p>
          <motion.button
            whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
            whileHover={{ backgroundColor: "#F4C400" }}
            transition={{ type: "spring", stiffness: "300" }}
            className=" w-[85px] h-[31px] mt-[39px] lg:w-[176px] lg:h-[60px] bg-[#FFDD00] lg:mt-[29px] ml-"
          >
            Log in
          </motion.button>
        </form>
      </div>
    </>
  );
}
