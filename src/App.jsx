
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nopage from "./Components/pages/Nopage/Nopage";
import Home from "./Components/pages/Home/Home";
import ProductInfo from "./Components/pages/ProductInfo/ProductInfo";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import Cart from "./Components/pages/Cart/Cart";
import Allproduct from "./Components/pages/Allproduct/Allproduct";
import Signup from "./Components/pages/Registration/Signup";
import Login from "./Components/pages/Registration/Login";
import Userdashboard from "./Components/pages/user/Userdashboard";
import AdminDashboard from "./Components/pages/Admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Nopage />} />
        <Route path="/productinfo" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/allproduct" element={<Allproduct/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Userdashboard" element={<Userdashboard/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
