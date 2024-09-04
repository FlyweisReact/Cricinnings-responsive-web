/** @format */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  const [terms, setTerms] = useState([]);
  const getAllTermsData = () => {
    GetData("userAuth/getAllPrivacyAndPolicy").then((res) => {
      setTerms(res?.data);
      //
    });
  };

  useEffect(() => {
    getAllTermsData();
  }, []);
  return (
    <div className="">
      <div
        className="container_terms full-width"
        style={{ width: "95%", margin: "auto" }}
      >
        <div>
          <div class="bg-white p-8 max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6 text-center large-text">Privacy Policy</h1>
            <h2 class="text-2xl font-semibold mb-4 medium-text">Who we are</h2>

            <p class="mb-4">
              <span className="font-bold medium-text">Our website address</span> is{" "}
              <Link to="https://cricinnings.com">https://cricinnings.com</Link>.
            </p>

            <p class="mb-4 small-text">
              By visiting our website which is https://cricinnings.com you agree
              to our Privacy Policy.
            </p>

            <h3 class="text-xl font-semibold mb-3 mt-6 medium-text">Consent</h3>
            <p class="mb-4 small-text">
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </p>

            <h3 class="text-xl font-semibold mb-3 mt-6 medium-text">Comments</h3>
            <p class="mb-4 small-text">
              When visitors leave comments on the site we collect the data shown
              in the comments form, and also the visitor’s IP address and
              browser user agent string to help spam detection.
            </p>
            <p class="mb-4 small-text">
              An anonymized string created from your email address (also called
              a hash) may be provided to the Gravatar service to see if you are
              using it. The Gravatar service privacy policy is available here:
              https://automattic.com/privacy/. After approval of your comment,
              your profile picture is visible to the public in the context of
              your comment.
            </p>

            <h3 class="text-xl font-semibold mb-3 mt-6 medium-text">Media</h3>
            <p class="mb-4 small-text">
              If you upload images to the website, you should avoid uploading
              images with embedded location data (EXIF GPS) included. Visitors
              to the website can download and extract any location data from
              images on the website.
            </p>

            <h3 class="text-xl font-semibold mb-3 mt-6">Cookies</h3>
            <p class="mb-4">
              If you leave a comment on our site you may opt-in to saving your
              name, email address, and website in cookies. These are for your
              convenience so that you do not have to fill in your details again
              when you leave another comment. These cookies will last for one
              year.
            </p>
            <p class="mb-4">
              If you visit our login page, we will set a temporary cookie to
              determine if your browser accepts cookies. This cookie contains no
              personal data and is discarded when you close your browser.
            </p>
            <p class="mb-4">
              When you log in, we will also set up several cookies to save your
              login information and your screen display choices. Login cookies
              last for two days, and screen options cookies last for a year. If
              you select “Remember Me”, your login will persist for two weeks.
              If you log out of your account, the login cookies will be removed
            </p>
            <p class="mb-4">
              if you edit or publish an article, an additional cookie will be
              saved in your browser. This cookie includes no personal data and
              simply indicates the post ID of the article you just edited. It
              expires after 1 day.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              Google DoubleClick DART Cookie
            </h3>
            <p class="mb-4">
              Google is one of the third-party vendors on our site. It also uses
              cookies, known as DART cookies, to serve ads to our site visitors
              based upon their visit to www.website.com and other sites on the
              internet. However, visitors may choose to decline the use of DART
              cookies by visiting the Google ad and content network Privacy
              Policy at the following URL –
              <Link to="https://policies.google.com/technologies/ads">
                {" "}
                https://policies.google.com/technologies/ads
              </Link>
            </p>

            <h3 class="text-xl font-semibold mb-3 mt-6">
              Advertising Partners Privacy Policies
            </h3>
            <p class="mb-4">
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of CricInnings.
            </p>
            <p class="mb-4">
              Third-party ad servers or ad networks use technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on CricInnings,
              which are sent directly to users’ browsers. They automatically
              receive your IP address when this occurs. These technologies are
              used to measure the effectiveness of their advertising campaigns
              and/or to personalise the advertising content that you see on
              websites that you visit.
            </p>
            <p className="mb-4">
              Note that CricInnings has no access to or control over these
              cookies that are used by third-party advertisers.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              Embedded content from other websites
            </h3>
            <p class="mb-4">
              Articles on this site may include embedded content (e.g. videos,
              images, articles, etc.). Embedded content from other websites
              behaves in the exact same way as if the visitor has visited the
              other website.
            </p>
            <p className="mb-4">
              These websites may collect data about you, use cookies, embed
              additional third-party tracking, and monitor your interaction with
              that embedded content, including tracking your interaction with
              the embedded content if you have an account and are logged in to
              that website.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              Who we share your data with
            </h3>
            <p class="mb-4">
              If you request a password reset, your IP address will be included
              in the reset email
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              How long do we retain your data?
            </h3>
            <p class="mb-4">
              If you leave a comment, the comment and its metadata are retained
              indefinitely. This is so we can recognize and approve any
              follow-up comments automatically instead of holding them in a
              moderation queue.
            </p>
            <p className="mb-4">
              For users that register on our website (if any), we also store the
              personal information they provide in their user profiles. All
              users can see, edit, or delete their personal information at any
              time (except they cannot change their username). Website
              administrators can also see and edit that information.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              What rights do you have over your data?
            </h3>
            <p class="mb-4">
              If you have an account on this site or have left comments, you can
              request to receive an exported file of the personal data we hold
              about you, including any data you have provided to us. You can
              also request that we erase any personal data we hold about you.
              This does not include any data we are obliged to keep for
              administrative, legal, or security purposes.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">
              Where your data is sent
            </h3>
            <p class="mb-4">
              Visitor comments may be checked through an automated spam
              detection service.
            </p>
            <h3 class="text-xl font-semibold mb-3 mt-6">Contact Us</h3>
            <p class="mb-4">
              If you have any queries related to the privacy policy or usage or
              capture of information feel free to contact us at{" "}
              <Link to="mailto:cricinnings17@gmail.com">
                cricinnings17@gmail.com
              </Link>
            </p>
          </div>
        </div>
        <div
          className="terms_content"
          style={{ borderRight: "1px solid gray" }}
        >
          <div dangerouslySetInnerHTML={{ __html: terms[0]?.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
