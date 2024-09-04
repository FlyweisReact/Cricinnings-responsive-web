import axios from "axios";
import { Store } from "react-notifications-component";

export const baseUrl = "https://cricinnings.in/api/";

export const auth = () => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
};

export const AuthToken = "7971ecfda0c915c1573e11d0d8032c9a";
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
    showMsg("danger", "Error", error?.response?.data?.message);
  }
};

export const VerifyOtp = async ({ email, otp, navigate }) => {
  const payload = {
    email,
    otp: +otp,
  };
  try {
    const res = await axios.post(
      `${baseUrl}userAuth/verifyOTPEmailOrPhone`,
      payload
    );

    localStorage.setItem("token", res?.data?.token);1
    showMsg("success", "Login Successful", res?.data?.message);
    navigate("/");
    return;
  } catch (error) {
    showMsg("danger", "Error", error?.response?.data?.message);
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

export const GetDataWithToken = async ({
  path,
  status,
  category,
  per_page,
}) => {
  try {
    const res = await axios.get(`${AuthUrl}${path}`, {
      params: {
        token: AuthToken,
        status: status,
        category: category,
        per_page: per_page,
      },
    });

    return res?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getOrdinalSuffix = (n) => {
  n = Number(n);

  if (isNaN(n)) {
    return "";
  }

  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const formatTitle = (title) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const convertStringFormat = (subtitle) => {
  subtitle = subtitle.replace(/(\d+)(?!\w)/g, (number) => {
    return convertToOrdinal1(number);
  });

  return subtitle.replace(/\s+/g, "-").toLowerCase();
};

function convertToOrdinal1(number) {
  const n = parseInt(number, 10);
  const suffixes = ["th", "st", "nd", "rd"];
  const mod100 = n % 100;
  return `${n}${
    suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0]
  }`;
}

export const highlightKeywords = (text) => {
  const regex = /\b(four|six|wicket)\b/gi;

  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <strong style={{ color: "#000" }} key={index}>
        {part}
      </strong>
    ) : (
      part
    )
  );
};
