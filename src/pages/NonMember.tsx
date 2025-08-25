import CheckIn from "../componeents/dashboard/CheckIn";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { paymentPlans, paymentConfirm } from "../../services/apis/payment";
import type { Plan } from "../../services/apis/payment";

export default function NonMember() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [active_payment, set_active_payment] = useState(false);
  const [error_message, set_error_message] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);

  useEffect(() => {
    try {
      const controller = new AbortController();

      async function plans() {
        const res = await paymentPlans({ signal: controller.signal });
        const plans_array = res.data;
        setPlans(plans_array);
      }
      plans();
      return () => controller.abort();
    } catch (error: any) {
      set_error_message(error.message);
    }
  }, []);

  async function handlePayment(
    user_id: string,
    plan_id: string,
    expires_at: string
  ) {
    try {
      await paymentConfirm({ user_id, plan_id, expires_at });
    } catch (error: any) {
      set_error_message(error.message);
    }
  }
  const paymentMade = async () => {
    try {
      const seat_id = localStorage.getItem("seat_id");
      const user_id = localStorage.getItem("user_id");

      seat_id && user_id;
      navigate("/paymentMade");
    } catch (error: any) {
      set_error_message(error.message);
    }
  };
  return (
    <div>
      <CheckIn>
        <div>
          <motion.div
            className=" absolute flex flex-col  justify-center items-center bg-white w-full left-0 bottom-0 lg:min-h-[476px] lg:w-[894px] lg:top-[253px] lg:bottom-[253px] lg:left-[309px] border-1 border-yellow-400 border-solid rounded "
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="h-[52px] w-[43px] mt-[15px] mb-[25px] lg:w-[71px] lg:h-[85px] lg:mt-[15px]"
              src="borderless_logo.jpg"
            ></img>

            <div className="flex flex-row justify-center items-center mb-[14px] lg:mb-[18px]">
              <h1 className=" text-[15px] lg:text-xl font-bold">
                Not a MEMBER
              </h1>
              <img
                src="redChecked.jpg"
                className="w-[23px] h-[23px] mb-[14px] lg:w-[33px] lg:h-[33px]"
              ></img>
            </div>
            <p className="text-center text-[13px] mb-[27px] lg:text-[25px] lg:mb-[45px]">
              {" "}
              Make a payment
            </p>

            <div className="flex flex-col lg:flex-row ml-[31px] mb-[46px] lg:ml-[51.57px] lg:mb-[62px]">
              <div className="flex flex-row">
                <div className="flex flex-col text-[13px] lg:text-[23px] mr-[200px] lg:mr-[169px]">
                  <p className=" mb-[24px] lg:mb-[21px]">Hours</p>
                  {plans.map((plan) => (
                    <p className=" mb-[22px] lg:mb-[15px]">{plan.name}</p>
                  ))}
                </div>
                <div className="flex flex-col text-[13px] lg:text-[23px] mr-[29px] lg:mr-[18px]">
                  <p className=" mb-[24px] lg:mb-[21px]">Amount</p>
                  {active_payment && selectedPlan && (
                    <p className="text-center text-green-400 text-[25px] mb-2">{`To pay ₦${selectedPlan.price} for ${selectedPlan.name}`}</p>
                  )}

                  {plans.map((plan, id) => (
                    <button
                      key={id}
                      className={`bg-[#04252D] text-white w-[100px] h-[30px] mb-[22px] mr-[5px] lg:mb-[15px] lg:w-[150px] lg:h-[50px] ${
                        active_payment && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        const id = localStorage.getItem("user_id");
                        let hours = 0;

                        if (plan.name === "Full Day") hours = 24;
                        else if (plan.name === "Half Day") hours = 12;
                        else if (plan.name === "Hourly") hours = 1;

                        const expires_at = new Date(
                          Date.now() + hours * 60 * 60 * 1000
                        ).toISOString();

                        id && handlePayment(id, plan.id, expires_at);

                        setSelectedPlan({ name: plan.name, price: plan.price }); // 👈 store clicked plan
                        set_active_payment(true); // just set it true (instead of toggling)
                      }}
                    >
                      {plan.price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center lg:ml-[18px]">
                <motion.button
                  whileTap={{ scale: 0.95, backgroundColor: "#F4C400" }}
                  whileHover={{ backgroundColor: "#F4C400" }}
                  transition={{ type: "spring", stiffness: "300" }}
                  onClick={paymentMade}
                  className="bg-[#04252D] text-white w-[169px] h-[38px] mb-[38px] mt-[38px] lg:w-[293px] lg:h-[59px]  lg:mb-[48px]"
                >
                  Payment Made
                </motion.button>
                <p className="text-center text-[13px] lg:mr-[23.57px]  lg:text-[17px]">
                  You now have access to make use of the Borderless <br /> web3
                  product house
                </p>
              </div>
            </div>
            <p className="text-red-500 mb-[10px] text-[20px]">
              {error_message}
            </p>
          </motion.div>
        </div>
        n
      </CheckIn>
    </div>
  );
}
