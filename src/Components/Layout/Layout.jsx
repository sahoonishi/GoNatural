import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Newfooter from './../NewFooter/Newfooter';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content  min-h-screen " key={Date.now}>{children}</div>
      <Footer />
      <Newfooter/>
      
    </>
  );
};

export default Layout;
