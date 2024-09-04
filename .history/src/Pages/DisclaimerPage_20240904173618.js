/** @format */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";

const DisclaimerPage = () => {
  const [terms, setTerms] = useState([]);

  const getAllTermsData = () => {
    GetData("userAuth/getAll/About").then((res) => {
      setTerms(res?.data);
    });
  };

  useEffect(() => {
    getAllTermsData();
  }, []);

  return (
    <div className="px-4 py-8">
      <div class="bg-white p-8 zero-padding">
        <h1 class="text-3xl font-bold mb-4 text-center medium-text">
          Disclaimer
        </h1>
        <div>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              If you require any more information or have any questions about
              our site’s disclaimer, please feel free to mail to
              cricinnings17@gmail.com.
            </span>
          </p>
          <h2>
            <strong style={{ fontSize: "22.5px" }}>
              Disclaimers for CricInnings
            </strong>
          </h2>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              All the information on this website – https://CricInnings.com – is
              published in good faith and for general information purposes only.
              CricInnings does not make any warranties about the completeness,
              reliability, and accuracy of this information. Any action you take
              upon the information you find on this website (CricInnings), is
              strictly at your own risk. CricInnings will not be liable for any
              losses and damages in connection with the use of our website.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              You can visit other websites from our website by following
              hyperlinks to such external sites. While we strive to provide only
              quality links to useful and ethical websites, we have no control
              over the content and nature of these sites. These links to other
              websites do not imply a recommendation for all the content found
              on these sites. Site owners and content may change without notice
              and may occur before we have the opportunity to remove a link that
              may have gone ‘bad’.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              Please be also aware that when you leave our website, other sites
              may have different privacy policies and terms that are beyond our
              control. Please be sure to check the Privacy Policies of these
              sites as well as their “Terms of Service” before engaging in any
              business or uploading any information.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              Every effort is made to keep the website up and running smoothly.
              However, CricInnings takes no responsibility for, and will not be
              liable for, the website being temporarily unavailable due to
              technical issues beyond our control.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              CricInnings would like to express that the images that we use on
              the website may be available on the Internet and are regarded as
              open-source for use representation purposes.
            </span>
          </p>
          <h2>
            <strong style={{font}} style="font-size: 22.5pt;">Advertisement Policy</strong>
          </h2>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              We use third-party advertising companies to serve advertisements.
              Some of them, like AdSense, use the DART cookie to serve
              advertisements based on a user’s interest and previous
              interactions. A user can always opt out of the DART cookie
              settings by visiting the Google ad and Content network privacy
              policy
            </span>
          </p>
          <h2>
            <strong style="font-size: 22.5pt;">Consent</strong>
          </h2>
          <p>
            <span style={{ fontSize: "13px", color: "rgb(33,33,33)" }}>
              By using our website, you hereby consent to our disclaimer and
              agree to its terms.
            </span>
          </p>
          <ul>
            <li>
              <br />
            </li>
          </ul>
        </div>
      </div>

      <div>
        {terms[0]?.content && (
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: terms[0]?.content }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default DisclaimerPage;
