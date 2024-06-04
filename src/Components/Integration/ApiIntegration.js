import axios from "axios"
import { toast } from "react-hot-toast";
export const baseUrl = "https://vipin-jha-cricbuzz.vercel.app/";

export const auth = () => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };
};

export const showMsg=(status)=>{
  return toast.success('Hello World', {
    duration: 2000,
    position: 'top-right',
  
    style: {},
    className: '',
  
    // Custom Icon
    icon: '👏',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });
}


export const LoginHandler=async({email,setOtp})=>{
  showMsg('success')
  try {
    const res=await axios.post(`${baseUrl}user/resendOtp`,{})
    return console.log(res?.data)
  } catch (error) {
    console.log(error)

    
  }

}