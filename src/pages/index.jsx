import React from "react";
import Layouts from "../layouts/Layouts";

import AboutSection from "../components/sections/About";
import ServicesSection from "../components/sections/Services";
import LoanCalculatorSection from "../components/sections/LoanCalculatorSection";
import HowItWorksSection from "../components/sections/HowItWorks";
import ContactSection from "../components/sections/Contact";
import Divider from "../components/sections/Divider";
import HeroSlideshowSlider from "../components/sliders/HeroSlideshow";

const Home1 = () => {
  return (
    <Layouts transparent>
      <HeroSlideshowSlider />
      <Divider />
      <AboutSection />
      <Divider />
      <ServicesSection sectionId="services" />
      <Divider />
      <LoanCalculatorSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <ContactSection />
    </Layouts>
  );
};
export default Home1;
