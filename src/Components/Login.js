import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { LoginHandler, VerifyOtp } from "./Integration/ApiIntegration";
import OTPInput from "otp-input-react";

const Login = () => {
  const [btnChecked, setBtnChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!btnChecked) return alert("Please");
    LoginHandler({
      email,
      phone,
      setOtpSent,
    });
  };

  const veriFyOtp = (e) => {
    e.preventDefault();
    VerifyOtp({ email, otp });
    alert(otp);
  };
  return (
    <div className="h-[700px]">
      <div className="text-center font-semibold text-3xl  mt-10">Log In</div>
      <div className=" flex justify-center  mt-5">
        <div className="flex items-center gap-2 ">
          <input
            type="checkbox"
            onChange={() => setBtnChecked(!btnChecked)}
            checked={btnChecked}
          />
          I agree to the{" "}
          <span className="text-[#1866DB] underline">Privacy Policy</span> and{" "}
          <span className="text-[#1866DB] underline">T & C</span>{" "}
        </div>
      </div>
      <Form onSubmit={otpSent ? veriFyOtp : handleLogin}>
        <div className="flex justify-center mt-5">
          {!otpSent ? (
            <input
              placeholder="Email id/Mobile Number"
              className="border h-[56px] w-[400px] rounded placeholder:pl-2"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          ) : (
            <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              secure
            />
          )}

          {/* <input
            placeholder="Email id/Mobile Number"
            className="border h-[56px] w-[400px] rounded placeholder:pl-2"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          /> */}
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-[#0F19AF] h-[40px] w-[400px] text-white rounded"
          >
            Continue
          </button>
        </div>
      </Form>
      <div className="flex justify-center mt-5">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-[#1866DB] underline">Sign Up</span>{" "}
        </Link>
      </div>

      <div className="flex justify-center mt-10">OR</div>
      <div className="flex flex-col items-center gap-4 justify-center mt-5">
        <button className="bg-[white] h-[40px] w-[400px] gap-2 border rounded flex justify-center items-center">
          <FcGoogle /> Continue with Google
        </button>
        <button className="bg-[white] h-[40px] w-[400px] gap-2 border rounded flex justify-center items-center">
          <FaApple /> Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
