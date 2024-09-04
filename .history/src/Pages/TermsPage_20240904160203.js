import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";

const TermsPage = () => {
  const [terms, setTerms] = useState([]);
  
  const getAllTermsData = () => {
    GetData("userAuth/getAllTermsAndConditions").then((res) => {
      setTerms(res?.data);
    });
  };

  useEffect(() => {
    getAllTermsData();
  }, []);

  return (
    <div className="">
      <div className="container_terms full-width" style={{ width: "95%", margin: "auto" }}>
        <div class="bg-white p-8 max-w-4xl mx-auto small-padding">
          <h1 class="text-3xl font-bold mb-6 text-center large-text">Terms and Conditions</h1>

          <p class="mb-4 text-sm text-gray-600 small-text">Please read the below terms and conditions carefully before using our website, CricInnings accessible at https://cricinnings.com</p>

          <h2 class="text-2xl font-semibold mb-4 medium-text">Welcome to CricInnings!</h2>

          <p class="mb-4 xs-small-text">These terms and conditions outline the rules and regulations for the use of CricInnings's Website, located at https://cricinnings.com/.</p>

          <p class="mb-4 xs-small-text">By accessing this website we assume you accept these terms and conditions. Do not continue to use CricInnings if you do not agree to take all of the terms and conditions stated on this page.</p>

          <p class="mb-4 xs-small-text">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: "Client", "You" and "Your" refers to you, the person who logs on this website and is compliant with the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.</p>

          <h3 class="text-xl font-semibold mb-3 mt-6 medium-text">Cookies</h3>
          <p class="mb-4 small-text">We employ the use of cookies. By accessing CricInnings, you agreed to use cookies in agreement with CricInnings's Privacy Policy.</p>

          <h3 class="text-xl font-semibold mb-3 mt-6 medium-text">License</h3>
          <p class="mb-4 small-text">Unless otherwise stated, CricInnings and/or its licensors own the intellectual property rights for all material on CricInnings. All intellectual property rights are reserved. You may access this from CricInnings for your own personal use subject to restrictions set in these terms and conditions.</p>

          <h4 class="text-lg font-normal mb-2 mt-4">You must not:</h4>
          <ul class="list-disc pl-6 mb-4">
            <li>Republish material from CricInnings</li>
            <li>Sell, rent, or sub-license material from CricInnings</li>
            <li>Reproduce, duplicate or copy material from CricInnings</li>
            <li>Redistribute content from CricInnings</li>
          </ul>



          <h3 class="text-xl font-semibold mb-3 mt-6">Contact Us</h3>
          <p class="mb-2">If you have any questions about these Terms and Conditions, You can contact us:</p>
          <ul class="list-disc pl-6">
            <li>By visiting <a href="https://cricinnings.com/contact-us/" class="text-blue-600 hover:underline">https://cricinnings.com/contact-us/</a></li>
            <li>Email at <a href="mailto:cricinnings17@gmail.com" class="text-blue-600 hover:underline">cricinnings17@gmail.com</a></li>
          </ul>
        </div>
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
