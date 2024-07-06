import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";

const TermsPage = () => {
  const [terms, setTerms] = useState([]);
  const getAllTermsData = () => {
    GetData("userAuth/getAllTermsAndConditions").then((res) => {
      setTerms(res?.data);
      // console.log(res?.data);
    });
  };

  useEffect(() => {
    getAllTermsData();
  }, []);
  return (
    <div className="">
      <div className="container_terms" style={{ width: "95%", margin: "auto" }}>
        <h1>Terms and Conditions</h1>
        <div
          className="terms_content"
          style={{ borderRight: "1px solid gray" }}
        >
          <div
            style={{ color: "black" }}
            dangerouslySetInnerHTML={{ __html: terms[0]?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
