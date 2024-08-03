import React from "react";
import LoginSignup from "./LoginSignup";

const InspectorLogin = () => {
  return (
    <div>
      <LoginSignup loginRole={"/inspector"} />
    </div>
  );
};

export default InspectorLogin;
