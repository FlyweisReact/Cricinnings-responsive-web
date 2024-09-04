/** @format */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";
import { Table } from "react-bootstrap";

const AboutPage = () => {
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
      <div class="bg-white">
        <h1 class="text-3xl font-bold mb-4 text-center medium-text">
          CricInnings - Home of Cricket
        </h1>

        <div class="mb-6">
          <p class="text-lg mb-4 small-text">Hello Cricket Lovers!</p>
          <p class="mb-2 small-text">
            <span className="font-bold medium-text">
              CricInnings -Home of Cricket:
            </span>{" "}
            A very warm welcome to all of you. Happy to see you on our cricket
            blog. CricInnings is an Indian cricket news website owned by{" "}
            <span className="font-bold medium-text">Mithila Ads</span>
          </p>
          <p class="mb-2 small-text">
            CricInnings is an Indian Cricket sports news website exclusively for
            the game of cricket. It features live cricket scores, cricket news,
            articles, IPL news, fantasy tips, and team predictions.
          </p>
        </div>

        <div class="mb-6">
          <p class="mb-2 small-text">
            We offer cricket updates from all over the globe, and features
            written by some of the best young cricket minds in the country.
            CricInnings blog is run by a small team in India.
          </p>
          <p class="mb-2 small-text">
            We are a small passionate team and cover cricket news from around
            the world. In our blog, we feature cricket news, match prediction,
            and best fantasy team prediction.
          </p>
        </div>

        <p class="mb-6 small-text">
          You can follow us on social sites for the latest cricket updates from
          around the world and share them with your friends if you like our
          website. Thanks for visiting the CricInnings website.
        </p>

        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-xxl font-bold mb-2 medium-text">CricInnings.Com</h2>
          <div>
            <Table striped bordered responsive>
              <thead></thead>
              <tbody>
                <tr>
                  <td className="small-text">Type of site</td>
                  <td className="small-text">Sports website exclusively for Cricket</td>
                </tr>
                <tr>
                  <td className="small-text">Available in</td>
                  <td className="small-text">Available in Hindi</td>
                </tr>
                <tr>
                  <td className="small-text">Headquarters</td>
                  <td className="small-text">Delhi</td>
                </tr>
                <tr>
                  <td className="small-text">Owner</td>
                  <td className="small-text">Mithila Ads (P) LTD</td>
                </tr>
                <tr>
                  <td className="small-text">Founder</td>
                  <td className="small-text">Vipin Kumar Jha</td>
                </tr>
                <tr>
                  <td className="small-text">Parent </td>
                  <td className="small-text">Mithila Ads</td>
                </tr>
                <tr>
                  <td className="small-text">URL</td>
                  <td className="small-text">www.cricinnings.com</td>
                </tr>
                <tr>
                  <td className="small-text">Commercial</td>
                  <td className="small-text">Yes (Non-subscription Ad revenue)</td>
                </tr>
                <tr>
                  <td className="small-text">Launched</td>
                  <td className="small-text"> 29th May 2022</td>
                </tr>
                <tr>
                  <td className="small-text">Current status</td>
                  <td className="small-text">Active</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <p className="text-2xl font-bold mb-2 mt-2 medium-text">
            {" "}
            CricInnings IPL 2023 Numbers
          </p>
        </div>

        <div class="mt-6">
          <p class="mb-2 small-text">
            If you have any queries, mail at – cricinnings17@gmail.com.
          </p>
          <p class="font-semibold medium-text">Follow Us on Social Networking sites:</p>
          <ul class="list-none list-inside small-text">
            <li>Email: cricinnings17@gmail.com</li>
          </ul>
        </div>

        <div class="mt-6">
          <p class="text-sm small-text">
            क्रिकेट से सम्बंधित खबरों (Live Cricket Scores, Cricket News Hindi,
            IPL News in Hindi) को पढ़ने के लिए हमें Google News, Facebook,
            Twitter or Instagram पर फॉलो करें
          </p>
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

export default AboutPage;
