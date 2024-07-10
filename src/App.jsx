import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nopage from "./Components/pages/Nopage/Nopage";
import Home from "./Components/pages/Home/Home";
import ProductInfo from "./Components/pages/ProductInfo/ProductInfo";
import Cart from "./Components/pages/Cart/Cart";
import Allproduct from "./Components/pages/Allproduct/Allproduct";
import Signup from "./Components/pages/Registration/Signup";
import Login from "./Components/pages/Registration/Login";
import Userdashboard from "./Components/pages/user/Userdashboard";
import AdminDashboard from "./Components/pages/Admin/AdminDashboard";
import AddProduct from "./Components/pages/Admin/AddProduct";
import UpdateProduct from "./Components/pages/Admin/UpdateProduct";
import Mycontext from "./Context/Mycontext";
import { Toaster } from "react-hot-toast";
import ProtectedUser from "./ProtectedRoute/ProtectedUser";
import { ProtectedAdmin } from "./ProtectedRoute/ProtectedAdmin";
import Category from "./Components/pages/Category/Category";


const App = () => {
  return (
    
      <Mycontext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Nopage />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/allproduct" element={<Allproduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/Userdashboard"
              element={
                <ProtectedUser>
                  <Userdashboard />
                </ProtectedUser>
              }
            />
            <Route
              path="/admindashboard"
              element={
                <ProtectedAdmin>
                  <AdminDashboard />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/addproduct"
              element={
                <ProtectedAdmin>
                  <AddProduct />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/updateproduct/:id"
              element={
                <ProtectedAdmin>
                  <UpdateProduct />
                </ProtectedAdmin>
              }
            />
            <Route path="/category/:categoryname" element={<Category/>}/>
          </Routes>

          <Toaster />
        </BrowserRouter>
      </Mycontext>
    
  );
};

export default App;
