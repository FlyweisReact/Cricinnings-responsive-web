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

export const LoginHandler = async ({ email, setOtp }) => {
  console.log(email);
  const payload = {};
  if (email) payload.email = email;
  if (setOtp) payload.setOtp = setOtp;
  try {
    const res = await axios.post(`${baseUrl}user/resendOtp`, payload);
    console.log(res?.data);
    showMsg("success", "OTP Sent", res?.data?.message);
    return;
  } catch (error) {
    console.log(error);
    showMsg("error", "Error", error?.response?.data?.message);
  }
};
