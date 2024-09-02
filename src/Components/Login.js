/** @format */

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { LoginHandler, showMsg, VerifyOtp } from "./Integration/ApiIntegration";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [btnChecked, setBtnChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!btnChecked)
      return showMsg("danger", "Please agree to terms and conditions");
    LoginHandler({
      email,
      phone,
      setOtpSent,
    });
  };

  const veriFyOtp = (e) => {
    e.preventDefault();
    VerifyOtp({ email, otp, navigate });
  };
  const renderButton = (buttonProps) => {
    return (
      <button {...buttonProps}>
        {buttonProps.remainingTime !== 0
          ? `Please wait for ${buttonProps.remainingTime} sec`
          : "Resend"}
      </button>
    );
  };
  const renderTime = () => React.Fragment;

  return (
    <section className="Login-Section">
      <p className="heading large-text">Log In</p>

      <div className="term-conditions small-text">
        <input
          type="checkbox"
          onChange={() => setBtnChecked(!btnChecked)}
          checked={btnChecked}
        />
        I agree to the{" "}
        <span
          className="text-[#1866DB] underline cursor-pointer"
          onClick={() => navigate("/privacy-policy")}
        >
          Privacy Policy
        </span>{" "}
        and{" "}
        <span
          className="text-[#1866DB] underline cursor-pointer"
          onClick={() => navigate("/terms-conditions")}
        >
          T & C
        </span>{" "}
      </div>

      <Form onSubmit={otpSent ? veriFyOtp : handleLogin}>
        <div className="flex justify-center mt-5">
          {!otpSent ? (
            <input
              placeholder="Email id"
              className="border h-[56px] w-[400px] rounded placeholder:pl-2"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          ) : (
            <>
              <div
                style={{
                  width: "40%",
                  textAlign: "center",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  secure
                  inputStyles={{
                    width: "3rem",
                    height: "3rem",
                    margin: "7px",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                />
                <br />
                <ResendOTP
                  maxTime={10}
                  onResendClick={() =>
                    LoginHandler({
                      email,
                      phone,
                      setOtpSent,
                    })
                  }
                  renderButton={renderButton}
                  renderTime={renderTime}
                />
              </div>
            </>
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

      <div className="flex justify-center mt-5 small-text gap-[5px] bold-font">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-[#1866DB] underline bold-font">Sign Up</span>{" "}
        </Link>
      </div>
    </section>
  );
};

export default Login;
