import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const PrivateComponent = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.get("token")) navigate("/login");
  }, []);

  return <>{children}</>;
};

export default PrivateComponent;
