export const baseUrl = "https://api.cricapi.com/v1/";

export const auth = () => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
};


const loginHandler=()=>{
  console.log(email,otp)
}