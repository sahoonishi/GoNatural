import React, { useContext } from "react";
import Layout from "../../Layout/Layout";
import Hero from "../../Hero/Hero";
import Category from "../../Category/Category";
import Homepageproductcard from "../../HomepageProductcard/Homepageproductcard";
import Track from "../../Track/Track";

import { UserContext } from "../../../Context/Mycontext";
import Loader from "../../Loader/Loader";
import ScrollToTop from './../../../ScrollToTop';

const Home = () => {
  const name = useContext(UserContext);
  return (
    <Layout>
      <Hero />
      <Category />
      <Homepageproductcard />
      <Track />
      <ScrollToTop/>
      
    </Layout>
  );
};

export default Home;
