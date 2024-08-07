import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";

const AboutPage = () => {
  const [terms, setTerms] = useState([]);
  const getAllTermsData = () => {
    GetData("userAuth/getAll/About").then((res) => {
      setTerms(res?.data);
      // 
    });
  };

  useEffect(() => {
    getAllTermsData();
  }, []);
  return (
    <div className="">
      <div className="container_terms" style={{ width: "95%", margin: "auto" }}>
        <h1>About</h1>
        <div
          className="terms_content"
          style={{ borderRight: "1px solid gray" }}
        >
          {terms[0]?.content && (
            <div dangerouslySetInnerHTML={{ __html: terms[0]?.content }}></div>
          )}

        {terms[0]?.content &&  <div style={{color:"black"}}> {terms[0]?.content}</div>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
