import React from "react";
import Layout from "../../Layout/Layout";
import Hero from "../../Hero/Hero";
import Category from "../../Category/Category";
import Homepageproductcard from "../../HomepageProductcard/Homepageproductcard";
import Track from "../../Track/Track";

const Home = () => {
  return <Layout>
    <Hero/>
    <Category/>
    <Homepageproductcard/>
    <Track/>
  </Layout>;
};

export default Home;
