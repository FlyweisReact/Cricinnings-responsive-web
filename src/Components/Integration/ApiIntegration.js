import axios from "axios";
import { Store } from "react-notifications-component";

export const baseUrl = "https://vipin-jha-cricbuzz.vercel.app/";

export const auth = () => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
};

export const showMsg = (type, title, msg) => {
  return Store.addNotification({
    title: title,
    message: msg,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const LoginHandler = async ({ email, setOtpSent }) => {
  console.log(email);
  const payload = {};
  if (email) payload.email = email;
  // if (setOtpSent) payload.setOtp = setOtp;
  try {
    const res = await axios.post(`${baseUrl}userAuth/resendOtp`, payload);
    console.log(res?.data);
    showMsg("success", "OTP Sent", res?.data?.message);
    alert(res?.data?.newOtp);
    setOtpSent(true);
    return;
  } catch (error) {
    console.log(error);
    showMsg("error", "Error", error?.response?.data?.message);
  }
};

export const VerifyOtp = async ({ email, otp }) => {
  const payload = {
    email,
    otp: +otp,
  };
  try {
    const res = await axios.post(
      `${baseUrl}userAuth/verifyOTPEmailOrPhone`,
      payload
    );
    console.log(res?.data);
    localStorage.setItem("token", res?.data?.token);

    showMsg("success", "Login Successful", res?.data?.message);
    return;
  } catch (error) {
    console.log(error);
    showMsg("error", "Error", error?.response?.data?.message);
  }
};

export const HomepageSliderData = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}user/getTeamMatches/25?status=1&per_page=10&paged=1`
    );
    console.log(res);
    // console.log(res?.data?.response?.items);
    // return res?.data?.response?.items;
    return res?.data?.matches;
    return res?.data;
  } catch (error) {
    console.log(error);
    showMsg("error", "Error", error?.response?.data?.message);
  }
};
