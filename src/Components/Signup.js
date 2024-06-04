import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
const Signup = () => {
  return (
    <div className="h-[700px]">
      <div className="text-center font-semibold text-3xl  mt-10">Sign Up</div>
      <div className=" flex justify-center  mt-5">
        <div className="flex items-center gap-2 ">
          <input type="checkbox" />I agree to the
          <span className="text-[#1866DB] underline">Privacy Policy</span>and
          <span className="text-[#1866DB] underline">T & C</span>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <input
          placeholder="Email id"
          className="border h-[56px] w-[400px] rounded placeholder:pl-2"
        />
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-[#0F19AF] h-[40px] w-[400px] text-white rounded">
          Continue
        </button>
      </div>
      <div className="flex justify-center mt-5">
        Already have an account?
        <Link to="/login">
          <span className="text-[#1866DB] underline">Log In</span>{" "}
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

export default Signup;
