import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { uniqueString } = useParams();
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify/${uniqueString}`);
        setVerificationMessage(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        setVerificationMessage("Error verifying email. Please try again.");
      }
    };

    verifyEmail();
  }, [uniqueString]);

  return (
    <div className="verification-container">
      <h1>Email Verification Successful</h1>
    </div>
  );
};

export default EmailVerification;
