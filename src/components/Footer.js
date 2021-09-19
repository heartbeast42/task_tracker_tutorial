import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    location.pathname === "/"? <div>
      <p>Copyright &copy; 2021</p>
      <Link to="/about">About</Link>
    </div> : ""
  );
}

export default Footer