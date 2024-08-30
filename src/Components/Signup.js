import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, showMsg } from "./Integration/ApiIntegration";
import axios from "axios";
const Signup = () => {
  const [buttonChecked, setButtonChecked] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (buttonChecked) {
      if (!email) {
        showMsg("danger", "Please enter email");
      } else {
        try {
          const res = axios.post(`${baseUrl}userAuth/register`, {
            email,
          });
          showMsg("success", "User registered successfully");
          navigate("/login");
        } catch (error) {}
      }
    } else {
      showMsg("danger", "Please accept terms and conditions");
    }
  };
  return (
    <div className="h-[700px]">
      <div className="text-center font-semibold text-3xl  mt-10">Sign Up</div>
      <div className=" flex justify-center  mt-5">
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            onChange={(e) => setButtonChecked(e.target.checked)}
            checked={buttonChecked}
          />
          I agree to the
          <span className="text-[#1866DB] underline">Privacy Policy</span>and
          <span className="text-[#1866DB] underline">T & C</span>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Email id"
          className="border h-[56px] w-[400px] rounded placeholder:pl-2"
        />
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleSignUp}
          className="bg-[#0F19AF] h-[40px] w-[400px] text-white rounded"
        >
          Continue
        </button>
      </div>
      <div className="flex justify-center mt-5">
        Already have an account?
        <Link to="/login">
          <span className="text-[#1866DB] underline">Log In</span>{" "}
        </Link>
      </div>

      {/* <div className="flex justify-center mt-10">OR</div>
      <div className="flex flex-col items-center gap-4 justify-center mt-5">
        <button className="bg-[white] h-[40px] w-[400px] gap-2 border rounded flex justify-center items-center">
          <FcGoogle /> Continue with Google
        </button>
        <button className="bg-[white] h-[40px] w-[400px] gap-2 border rounded flex justify-center items-center">
          <FaApple /> Continue with Apple
        </button>
      </div> */}
    </div>
  );
};

export default Signup;
