import React from "react";
import { useLocation } from "react-router-dom";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div
      className={`lg:h-screen ${
        location.pathname.includes("login") ? "h-screen" : null
      } w-full flex justify-center items-center bg-login-background`}
    >
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};

export default LoginLayout;
