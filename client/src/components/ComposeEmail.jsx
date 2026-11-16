
import { useState } from "react";
import axios from "axios";

function ComposeEmail() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("Sending email...");

      const response = await axios.post(
        "http://localhost:5000/api/emails/send",
        formData
      );

      setStatus(response.data.message);

      setFormData({
        to: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      setStatus("Email sending failed!");
    }
  };

  return (
    <div>
      <form className="email-form" onSubmit={handleSubmit}>

        <input
          type="email"
          name="to"
          placeholder="✉  Receiver Email Address"
          value={formData.to}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button className="send-button" type="submit">
          ✦ Send Email
        </button>

      </form>

      {status && (
        <p className="status-message">{status}</p>
      )}
    </div>
  );
}

export default ComposeEmail;
