import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content  min-h-screen " key={Date.now}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
