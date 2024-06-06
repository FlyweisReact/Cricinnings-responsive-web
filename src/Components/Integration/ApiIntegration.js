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

export const AuthToken = "ec471071441bb2ac538a0ff901abd249";
export const AuthUrl = "https://rest.entitysport.com/v2/";

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
  const payload = {};
  if (email) payload.email = email;
  try {
    const res = await axios.post(`${baseUrl}userAuth/resendOtp`, payload);

    showMsg("success", "OTP Sent", res?.data?.message);
    alert(res?.data?.newOtp);
    setOtpSent(true);
    return;
  } catch (error) {
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

    localStorage.setItem("token", res?.data?.token);

    showMsg("success", "Login Successful", res?.data?.message);
    return;
  } catch (error) {
    showMsg("error", "Error", error?.response?.data?.message);
  }
};

export const HomepageSliderData = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}user/getTeamMatches/25?status=1&per_page=10&paged=1`
    );

    return res?.data?.matches;
    return res?.data;
  } catch (error) {
    showMsg("error", "Error", error?.response?.data?.message);
  }
};

export const GetData = async (path) => {
  try {
    const res = await axios.get(`${baseUrl}${path}`);

    return res?.data;
  } catch (error) {}
};

export const GetDataWithToken = async ({ path, status }) => {
  try {
    const res = await axios.get(
      `${AuthUrl}${path}?token=${AuthToken}&status=${status}`
    );

    return res?.data;
  } catch (error) {}
};
