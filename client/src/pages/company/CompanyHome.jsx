import Features from "components/features/ThreeColSimple";
import Hero from "components/hero/Hero";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import React from "react";
import Whyus from "components/cards/TwoColumnWithVideo";
import DownloadApp from "components/cta/DownloadApp";
import Footer from "components/footer/SimpleFourColumn";

const Home = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <Features />
      <Whyus />
      <DownloadApp />
      <Footer />
    </AnimationRevealPage>
  );
};

export default Home;
