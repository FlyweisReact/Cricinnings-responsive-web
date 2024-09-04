/** @format */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import {
  auth,
  baseUrl,
  showMsg,
} from "../Components/Integration/ApiIntegration";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (message) payload.requirements = message;
    if (phone) payload.mobile = phone;
    if (subject) payload.subject = subject;
    if (company) payload.company = company;
    if (city) payload.city = city;

    try {
      const res = await axios.post(
        `${baseUrl}userAuth/createAdvertisingInquiry`,
        payload,
        auth
      );
      showMsg("success", "Message sent successfully", res?.data?.message);
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setSubject("");
      setCompany("");
      setCity("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-8">
      <div class="bg-white p-8 zero-padding">
        <h1 class="text-3xl font-bold mb-4 text-center medium-text">Contact Us</h1>
        <div>
          <p className="small-text">Hey, Cricket Fans!</p>
          <p>
            We’d love to hear from you! Please share your feedback, suggestions,
            or questions about our live cricket scores, match updates, and
            predictions. We're here to inform you of the latest scores, daily
            cricket news, and updates. Reach out and help us make your cricket
            experience even better!
          </p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder="Enter Phone Number"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
              controlId="formBasicEmail"
            >
              <Form.Control type="text" placeholder="Enter Company" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder="Enter City"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                type="text"
                placeholder="Enter Subject"
              />
            </Form.Group>
          </div>
          <div>
            {" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                as={"textarea"}
                rows={3}
                placeholder="Enter Message"
              />
            </Form.Group>
          </div>
          <div>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default ContactUsPage;
