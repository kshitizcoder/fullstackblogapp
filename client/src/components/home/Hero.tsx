import React from "react";
import MainBanner from "./MainBanner";
import SideHero from "./SideHero";

const Hero: React.FC = () => {
  return (
    <section className="lg:flex  h-screen lg:w-screen mt-18 gap-10">
      <div className="md:w-[70%]">
        <MainBanner />
      </div>
      <div className="mt-10 lg:mt-0">
        <SideHero />
      </div>
    </section>
  );
};

export default Hero;
